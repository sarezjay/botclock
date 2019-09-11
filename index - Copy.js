const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.id === '249010731910037507');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});


client.on('message', message => {
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if (message.content.startsWith(`${prefix}ping`)) {
		message.channel.send('Pong.');
	}   
		else if (message.content.startsWith(`${prefix}tick`)) {
		message.channel.send(`Tock.`);
	}
		else if (message.content.startsWith(`${prefix}tagmeplz`)) {
		message.channel.send(`what the FUCK DO U WNAT ${message.author}`);
	}
		else if (message.content.startsWith(`${prefix}beep`)) {
		message.channel.send('Boop.');
	}
		else if (message.content === `${prefix}server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
		else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
		else if (command === 'args-info') {
			if (!args.length) {
				return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	
		else if (command === 'kick') {
		// grab the "first" mentioned user from the message
		// this will return a `User` object, just like `message.author`
			if (!message.mentions.users.size) {
				return message.reply('you need to tag a user in order to kick them!');
			}		

			const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
		}





});

client.login(token);
