
module.exports = {
	
	// hours = 249024441118490624
	// minutes = 489186989627670538
	// seconds = 434084702694146049
	// deciseconds = 284691700063010817
	
	
	name: 'stop',
	aliases: ['s'],
	description: 'Stops all audio playback',
	execute(message, args) {
		
				  if (message.guild.me.voiceChannel !== undefined) {
					message.guild.me.voiceChannel.leave();
					message.reply("done");
				  } else {
					message.reply("I am not connected to a voice channel, dingus");
				  }
		
	},
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