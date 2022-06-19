const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const random = require("something-random-on-discord").Random

module.exports = {
    data: new SlashCommandBuilder()
        .setName('neko')
        .setDescription('Drops a neko image'),
    async execute(interaction) {
        let data = await random.getNeko()
        let content = data.embed.image.url
        let embed = new MessageEmbed()
        .setDescription(`Here's your Neko`)
        .setColor('RANDOM')
        .setImage(content)
        await interaction.reply({embeds: [embed]})
    }
}