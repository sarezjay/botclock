module.exports = {
	
	// hours = 249024441118490624
	// minutes = 489186989627670538
	// seconds = 434084702694146049
	// deciseconds = 284691700063010817
	
	
	name: 'ban',
	aliases: ['b'],
	description: 'B&',
	execute(message, args) {
	if(message.member.roles.has('249024441118490624')) 
	 //  || message.member.roles.has('489186989627670538')
	//   || message.member.roles.has('434084702694146049')
	 //  || message.member.roles.has('284691700063010817')) 
		{			

			const taggedUser = message.mentions.members.first();
			const taggedUserID = message.mentions.members.id;
			
			if (!message.mentions.users.size) {
					return message.reply('you need to tag a user in order to ban them');
			}		
			
			else if(taggedUserID == "206573906058805248") {
							const bot = message.client.emojis.find(emoji => emoji.name === "bot");
							const gun = message.client.emojis.find(emoji => emoji.name === "gun3");
							const poly = message.client.emojis.find(emoji => emoji.name === "polyfun");
							message.react(bot)
							.then(() => message.react(gun))
							.then(() => message.react(poly));
			}
			
							var VC = message.guild.channels.find(channel => channel.id === '618485503913623552');
							if (!VC)
							return message.reply("I cannot find a voice channel to join!")
							VC.join()
							.then(connection => {
								const dispatcher = connection.playFile('F:/newBotClock/banned.mp3');
								dispatcher.on("end", end => {VC.leave()});
							})
							.catch(console.error);
			
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