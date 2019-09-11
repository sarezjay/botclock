const ytdl = require('ytdl-core');
const YouTube = require("discord-youtube-api"); 
const youtube = new YouTube("AIzaSyBRethRtCiH5uq4yLd7u8eXOwzs8cUBm7c");
module.exports = {
	
	// hours = 249024441118490624
	// minutes = 489186989627670538
	// seconds = 434084702694146049
	// deciseconds = 284691700063010817
	
	
	name: 'play',
	aliases: ['p', 'youtube', 'yt'],
	description: 'Play first result from YouTube search',
	execute(message, args) {
			
//	if(message.member.roles.has('249024441118490624')) {
		
		if(args != ""){
		
				async function searchYouTubeAsync(args) {
					var video = await youtube.searchVideos(args.toString().replace(/,/g,' '));
					console.log(`\nVideo request by ${message.member.displayName}`);
					console.log(`Now playing : ${video.url}`);
					// console.log(typeof String(video.url));
					console.log(video.title);
					console.log('\n');
					return String(video.url);
				}
		
				async function searchYouTubeAsync1(args) {
					var video = await youtube.searchVideos(args.toString().replace(/,/g,' '));
					return String(video.title);
				}
							isReady = false;
							var VC = message.guild.channels.find(channel => channel.id === '618485503913623552');
							if (!VC) {								
								return message.reply("I cannot find a voice channel to join!");
							}
		else {
							VC.join().then(async connection => {
								let url = await searchYouTubeAsync(args);
								let title = await searchYouTubeAsync1(args);
								const stream = ytdl(url, { filter: 'audioonly' });
								const dispatcher = connection.playStream(stream);
								message.reply(`now playing : **${title}** // ${url}`);
								dispatcher.on('end', () => VC.leave());
								isReady = true;
							}).catch(console.error);
			
							}
				
	}
		
		else {
			message.reply('please enter a search term');
	}
		}
		
	//}	
};
			
			
			
			
			
			
			
		/*	
			
			const taggedUser = message.mentions.members.first();
			
			
			if (!message.mentions.users.size) {
					return message.reply('you need to tag a user in order to ban them');
				}		
		
			
			else if(taggedUser.roles.some(role => role.id === '615637467210448901')){
				message.channel.send("I can't ban myself u fuk");
			}
			
			
			else if(taggedUser.roles.some(role => role.id === '249024441118490624')){
				return message.reply("you can't ban someone with that role");
			}
		
			else {
				message.channel.send(`BANNED : ${taggedUser.username}`);
				let member = message.mentions.members.first();
  				let reason = args.slice(1).join(" ");
  				member.kick(reason);
			}
		}
			
		else {
			return message.reply('you are not allowed to ban people');
		}
	},
};

*/