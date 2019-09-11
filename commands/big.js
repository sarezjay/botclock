module.exports = {
	name: 'big',
	description: 'Converts letters into BIG letter emojis',
	args: true,
	execute(message, args) {
			if(message.member.roles.has('249024441118490624') //hours
				|| message.member.roles.has('489186989627670538') // minutes
				|| message.member.roles.has('434084702694146049') // seconds
				|| message.member.roles.has('284691700063010817')) // deciseconds
		{
		
			function strReplace(args){
				
				var chars = {
						'0':':zero: ',
						'1':':one: ',
						'2':':two: ',
						'3':':three: ',
						'4':':four: ',
						'5':':five: ',
						'6':':six: ',
						'7':':seven: ',
						'8':':eight: ',
						'9':':nine: ',
						'a':':regional_indicator_a: ',
						'b':':regional_indicator_b: ',
						'c':':regional_indicator_c: ',
						'd':':regional_indicator_d: ',
						'e':':regional_indicator_e: ',
						'f':':regional_indicator_f: ',
						'g':':regional_indicator_g: ',
						'h':':regional_indicator_h: ',
						'i':':regional_indicator_i: ',
						'j':':regional_indicator_j: ',
						'k':':regional_indicator_k: ',
						'l':':regional_indicator_l: ',
						'm':':regional_indicator_m: ',
						'n':':regional_indicator_n: ',
						'o':':regional_indicator_o: ',
						'p':':regional_indicator_p: ',
						'q':':regional_indicator_q: ',
						'r':':regional_indicator_r: ',
						's':':regional_indicator_s: ',
						't':':regional_indicator_t: ',
						'u':':regional_indicator_u: ',
						'v':':regional_indicator_v: ',
						'w':':regional_indicator_w: ',
						'x':':regional_indicator_x: ',
						'y':':regional_indicator_y: ',
						'z':':regional_indicator_z: ',
						'!':':exclamation: ',
						'?':':question: '};
				var s = args.toString().toLowerCase();
				s = s.replace(/,/g, "    ");
				s = s.replace(/[0-9a-zA-Z_.,!?]/g, m => chars[m]);
				return s;

			}
			
			var lastMessage = message.id;		
			
			message.channel.fetchMessages({around: lastMessage, limit: 1})
			.then(messages => {
				const fetchedMsg = messages.first(); // messages is a collection!)
				// do something with it
				fetchedMsg.delete();
			});

			
			//lastMessage.edit(`${strReplace(args)}`);
			
			message.channel.send(`${strReplace(args)}`);				
			var myDate = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
			myDate = new Date(myDate);
			console.log(`\n[${myDate.toLocaleString()}]\nBig boi font used by : ${message.member.displayName}`);			
			var log = args.toString().toLowerCase();
			log = log.replace(/,/g, " ");
			console.log(`Message : ${log}`);
			//message.channel.send(lastMessage);
		}
	},
};