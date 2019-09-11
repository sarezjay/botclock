module.exports = {
	name: 'tick',
	description: 'Tock!',
	execute(message, args) {
		message.channel.send('Tock');
	},
};