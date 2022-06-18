const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		let embed = new MessageEmbed()
			.setDescription(`Pong! - ${Date.now() - interaction.createdTimestamp}ms`)
			.setColor("RANDOM")
			.setFooter({text: `Requested by ${interaction.user.username}`})
			
		await interaction.reply({ embeds: [embed] })
	},
};