const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const random = require("something-random-on-discord").Random

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Pat someone in the server')
        .addUserOption(option => option.setName('user').setDescription('user to pat').setRequired(true)),
    async execute(interaction) {
        let data = await random.getAnimeImgURL("pat")
        let user = interaction.options.getUser('user')
        let embed = new MessageEmbed()
        .setDescription(`${interaction.user.username} pats ${user.username}`)
        .setColor('RANDOM')
        .setImage(data)
        await interaction.reply({embeds: [embed]})
    }
}