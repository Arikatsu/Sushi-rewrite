const Logger = require('./../utils/logger')
const c = new Logger()

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client, message) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;
 
		try {
			await command.execute(interaction, client, message);
		} catch (error) {
			c.error(error, __filename);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};