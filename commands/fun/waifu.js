const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const random = require("something-random-on-discord").Random

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Drops a random waifu'),
    async execute(interaction) {
        let data = await random.getAnimeImgURL("waifu")
        let embed = new MessageEmbed()
        .setDescription(`Here's your waifu`)
        .setColor('RANDOM')
        .setImage(data)
        await interaction.reply({embeds: [embed]})
    }
}