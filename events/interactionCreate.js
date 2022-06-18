module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client, message) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;
 
		try {
			await command.execute(interaction, message, client);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};