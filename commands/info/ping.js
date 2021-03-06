const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with client\'s ping'),
	async execute(interaction, client) {
		let embed = new MessageEmbed()
			.setDescription(`Pong! - ${client.ws.ping}ms`)
			.setColor("RANDOM")
			.setFooter({text: `Requested by ${interaction.user.username}`})
			
		await interaction.reply({ embeds: [embed] })
	},
};