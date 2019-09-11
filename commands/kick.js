module.exports = {
	
	// hours = 249024441118490624
	// minutes = 489186989627670538
	// seconds = 434084702694146049
	// deciseconds = 284691700063010817
	
	
	name: 'kick',
	aliases: ['k', 'kik'],
	description: 'Kick!',
	execute(message, args) {
	if(message.member.roles.has('249024441118490624')) 
	 //  || message.member.roles.has('489186989627670538')
	//   || message.member.roles.has('434084702694146049')
	 //  || message.member.roles.has('284691700063010817')) 
		{
			
			
			const taggedUser = message.mentions.members.first();
			
			
			if (!message.mentions.users.size) {
					return message.reply('you need to tag a user in order to kick them');
				}		
		
			
			else if(taggedUser.roles.some(role => role.id === '615637467210448901')){
				message.channel.send("I can't kick myself u fuk");
			}
			
			
			else if(taggedUser.roles.some(role => role.id === '249024441118490624')){
				return message.reply("you can't kick someone with that role");
			}
		
			else {				
				var myDate = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
				myDate = new Date(myDate);
				//var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
				console.log(`\n[${myDate.toLocaleString()}]\n ${taggedUser.username} kicked by ${message.member.displayName}`);
				message.channel.send(`Kicked : ${taggedUser.username}`);
				let member = message.mentions.members.first();
  				let reason = args.slice(1).join(" ");
  				member.kick(reason);
			}
		}
			
		else {
			return message.reply('you are not allowed to kick people');
		}
	},
};