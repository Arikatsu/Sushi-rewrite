const Logger = require('./../utils/logger')
const c = new Logger()

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		c.info(`Client ready! Logged in as ${client.user.tag}`, __filename);
	},
};