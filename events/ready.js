module.exports = {
	name: 'ready',
	execute(client) {
		c.info(`Client ready! Logged in as ${client.user.tag}`);
	},
};