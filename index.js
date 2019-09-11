const fs = require('fs');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('\nReady!');
});

// hangman

var usage = "`!hangman <channel name> <your phrase>`\n`Example: !hangman atomic-bar todays fuckable sandwich`";
var letters = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];
var unicode = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var games = [];

var stages = [`\`\`\`
/---|
|   
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|   |
| 
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|  /
|
\`\`\`
`, `\`\`\`
/---|
|   o ~ u suck
|  /|\\
|  / \\
|
\`\`\`
`];

client.on('ready', () => {
    client.user.setStatus("!hangman");
  	console.log(`Logged in as ${client.user.tag}!`);
});

function generateMessage(phrase, guesses) {
	var s = "";
	for(var i = 0; i < phrase.length; i++) {
		if(phrase[i] == ' ')
			s += " ";
		else {
			var c = phrase[i];
			if(guesses.indexOf(c) == -1)
				c = "\\_";
			s += "__" + c + "__ ";
		}
	}
	return s;
}

function nextLetter(message, index, word) {
    message.react(letters[index]).then(r => {
		index++;
		if(index < letters.length) {
			if(index == 13) {
				message.channel.send(generateMessage(word, [])).then(m => {
					games.push({
						stage: 0,
						msg0: message,
						msg1: m,
						phrase: word,
						guesses: []
					});
					nextLetter(m, index);
				});
			} else {
				nextLetter(message, index, word);
			}
		}
	});
}

client.on('messageReactionAdd', (reaction, user) => {
	var msg = reaction.message;
	if(!user.bot) {
		for(var i = 0; i < games.length; i++) {
			var game = games[i];
			if((msg.id == game.msg0.id || msg.id == game.msg1.id) && game.stage < stages.length) {
				var letter = unicode[letters.indexOf(reaction.emoji.name)];
				
				reaction.fetchUsers().then(usrs => {
					var reactors = usrs.array();
					var remove_next = function(index) {
						if(index < reactors.length)
							reaction.remove(reactors[index]).then(() => remove_next(index + 1));
					};
					
					remove_next(0);
				});
				
				if(game.guesses.indexOf(letter) == -1) {
					game.guesses.push(letter);
					if(game.phrase.indexOf(letter) == -1) {
						game.stage ++;
						game.msg0.edit(stages[game.stage]);
					} else {
						var sik = true;
						for(var j = 0; j < game.phrase.length; j++) {
							var c = game.phrase[j];
							if(c != ' ' && game.guesses.indexOf(c) == -1) {
								sik = false;
							}
						}
						
						if(sik) {
							game.msg0.edit(stages[game.stage].replace("o", "o ~ good job"));
						}
						
						game.msg1.edit(generateMessage(game.phrase, game.guesses));
					}
				}
			}
			games[i] = game;
		}
	}
});

client.on('message', msg => {
    if(msg.content.startsWith("!hangman")) {
        var words = msg.content.split('\n')[0].split(' ');
		var regex = /^[a-zA-Z]+$/
		var isValid = regex.test(words[2]);
        if(words.length < 2) {
            msg.reply(usage);
        } else if(!isValid){
			//msg.reply(words[2]);
			msg.reply('letters only please');
		} else {
			
			//let channel = guild.channels.find("name",guilds[guild.id].digitchan);
			//let channel = guild.channels.find(channel => channel.name === guilds[guild.id].digitchan);
			
			
			
           // var channel = client.channels.find('id', words[1]);
			console.log(`\nHangman game started by ${msg.author.username}`);
			var channel = client.channels.find(channel => channel.name === words[1]);
			// var channel =  client.channels.find(channel => channel.id === words[1]);
			var word = words.slice(2).join(' ').toLowerCase().replace(/[^a-z\s:]/g, '');
            if(channel != null) {
                channel.send(stages[0]).then(m => {
                    nextLetter(m, 0, word);
                });
            } else {
                msg.reply("No channel with the name `" + words[1] + "` exist! \n" + usage);
            }
        }
    }
});

// end hangman


client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.id === '249010731910037507');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the Clock Crew server, ${member}`);
});

// check octopusclock's role and if it's anything but centisecond, we change it back lol

client.on('message', message => {	
	
	let member = message.author.id;
	if(member == "1357208133547982848"){
		var roles = [];
		roles.push('489186989627670538'); // minutes
		roles.push('434084702694146049'); // seconds
		roles.push('284691700063010817'); // deciseconds
		var i;
		for(i = 0; i <= roles.length; i++){
			if(message.member.roles.has(roles[i])){
				console.log(`Role ID found for OctopusClock: ${roles[i]}`);
				console.log('Removing role...');
				message.member.removeRole(roles[i]).catch(console.error);
			   }
		}
	}
	//if(message.member.roles.has('249024441118490624')) 
});

// end octopusclock fuckery

// random commands

client.on('message', message => {
	
	if(message.content.startsWith("!fishslap")) {
		
		message.react('🐟').then(() => message.react('👋'));
		
	}
	
});

client.on('message', message => {
	
	if(message.content.startsWith("!fishslap")) {
		
		message.react('🐟').then(() => message.react('👋'));
		
	}
	
	if(message.content.startsWith('!fucku') || message.content.startsWith('!fuckyou')) {
	   
	   					message.channel.send({
						files: [{
							attachment: '../newBotClock/u.wav',
							name: 'u.wav'
						}]
					})
		}
	
	if(message.content.toLowerCase().startsWith('redeem this')) {
		
		const gun = client.emojis.find(emoji => emoji.name === 'gun7');
		
		message.channel.send(`${gun}`);
		
	}
});

// end random commands

// random insults/responses

client.on('message', message => {
	
	
	if (!message.content.startsWith(prefix) || message.author.bot) {
		
		if(message.content.toLowerCase().includes("is he coming") && !message.author.bot){
					message.reply("he's coming 4 u");
					message.channel.send({
						files: [{
							attachment: '../newBotClock/coming.jpg',
							name: 'coming.jpg'
						}]
					})
					
		}
	
		if (message.content.includes(':bot:') && !message.author.bot) {
			const bot = client.emojis.find(emoji => emoji.name === "bot");
			message.channel.send(`${bot}`);
		}

		if (message.content.toLowerCase().includes('fart') && !message.author.bot){
			const butt = client.emojis.find(emoji => emoji.name === "uranus");
			message.react(butt)
			.then(() => message.react('💨'));
		}
		
		if(message.content.toLowerCase().includes('ban poly') && !message.author.bot){
				const bot = client.emojis.find(emoji => emoji.name === "bot");
				const gun = client.emojis.find(emoji => emoji.name === "gun3");
				const poly = client.emojis.find(emoji => emoji.name === "polyfun");
				message.react(bot)
				.then(() => message.react(gun))
				.then(() => message.react(poly));
		}
		
		

		else if(!message.author.bot){
				if(message.content.toLowerCase().includes('botclock') || 
			  message.content.toLowerCase().includes('BOTCLOCK') ||
			  message.content.toLowerCase().includes('BOT CLOCK') ||
			  message.isMentioned(client.user)) {
					if(message.content.toLowerCase().includes('fuck') ||
					   message.content.toLowerCase().includes('ugly') ||
					   message.content.toLowerCase().includes('hell') ||
					   message.content.toLowerCase().includes('shit') ||
					   message.content.toLowerCase().includes('shitty') ||
					   message.content.toLowerCase().includes('the worst') ||
					   message.content.toLowerCase().includes('gay') ||
					   message.content.toLowerCase().includes('crap') ||
					   message.content.toLowerCase().includes('fart') ||
					   message.content.toLowerCase().includes('homo') ||
					   message.content.toLowerCase().includes('dick') ||
					   message.content.toLowerCase().includes('hate') ||
					   message.content.toLowerCase().includes('suck') ||
						message.content.toLowerCase().includes('sucks')) {
							var num = (Math.floor(Math.random() * 13));
							var text123 = "";
								switch(num){
									case 0:
										text123 = "lick my balls";
										break;
									case 1:
										text123 = "go fuck yourself";
										break;
									case 2:
										text123 = "FUCK YOU";
										break;
									case 3:
										text123 = "fucking DIE";
										break;
									case 4:
										text123 = "eat shit and die";
										break;
									case 5:
										text123 = "i fucked your mother";
										break;
									case 6:
										text123 = "you worthless POS";
										break;
									case 7:
										text123 = "i'm gonna kick your ass";
										break;
									case 8:
										text123 = "you fucking prick";
										break;
									case 9:
										text123 = "suck my robo diugh";
										break;
									case 10:
										text123 = "get motherFUCKED";
										break;
									case 11:
										text123 = "u cunt";
										break;
									case 12:
										text123 = "get mcfucked";
										break;
									default:
										text123 = "fuck u";
										break;
									}
						}
				else {
						var num = (Math.floor(Math.random() * 4));
						var text123 = "";
							switch(num){
								case 0:
									text123 = ":)";
									break;
								case 1:
									text123 = ":^)";
									break;
								case 2:
								default:
									text123 = "<3";
									break;
								}		

					}

				message.reply(text123);
			}
		}
	}
	
// end random responses/insults

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).split(' ');
	const commandName = args.shift().toLowerCase();
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	
	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


});

client.login(token);
