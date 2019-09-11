module.exports = {
	name: 'suckmydick',
	description: 'Suck it',
	execute(message, args) {
		message.channel.send({
			files: [{
				attachment: '../newBotClock/royalpenis.wav',
				name: 'royalpenis.wav'
  			}]
		})
	},
}