const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const random = require("something-random-on-discord").Random

module.exports = {
    data: new SlashCommandBuilder()
        .setName('advice')
        .setDescription('Gives random advice for no reason'),
    async execute(interaction) {
        let data = await random.getAdvice()
        let content = data.embed.description
        let embed = new MessageEmbed()
        .setDescription(content)
        .setColor('RANDOM')
        await interaction.reply({embeds: [embed]})
    }
}