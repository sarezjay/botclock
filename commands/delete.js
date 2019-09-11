module.exports = {
	
	// hours = 249024441118490624
	// minutes = 489186989627670538
	// seconds = 434084702694146049
	// deciseconds = 284691700063010817
	
	
	name: 'delete',
	aliases: ['delete', 'clear', 'd'],
	description: 'Deletes last # of messages',
	execute(message, args) {
	if(message.member.roles.has('249024441118490624')) 
	 //  || message.member.roles.has('489186989627670538')
	//   || message.member.roles.has('434084702694146049')
	 //  || message.member.roles.has('284691700063010817')) 
		{	
			
			var numMsg = args;
			var regex = /^[0-9]+$/
			var isValid = regex.test(numMsg);
			
  			if(!isValid || !numMsg){
				message.reply("please enter a number between 1 and 99");
			}
			
			else if(numMsg > 99){
				message.reply("please enter a number below 100");
			}
			
			else {
				async function clear() {
					message.delete();
					const fetched = await message.channel.fetchMessages({limit: numMsg});
					message.channel.bulkDelete(fetched);
				}
				var myDate = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
				myDate = new Date(myDate);
				//var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
				console.log(`\n[${myDate.toLocaleString()}]\nDelete command sent by ${message.author.username} in # ${message.channel.name}. Messages deleted : ${numMsg}`);
				clear();
				message.channel.send(`**Delete command sent by ${message.member.displayName}. Messages deleted : ${numMsg}**`);
			}

		}
		else {
			message.reply("you are not allowed to use this command");
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