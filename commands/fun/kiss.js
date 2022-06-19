const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const random = require("something-random-on-discord").Random

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Kiss someone in the server')
        .addUserOption(option => option.setName('user').setDescription('user to kiss').setRequired(true)),
    async execute(interaction) {
        let data = await random.getAnimeImgURL("kiss")
        let user = interaction.options.getUser('user')
        let embed = new MessageEmbed()
        .setDescription(`${interaction.user.username} kisses ${user.username}`)
        .setColor('RANDOM')
        .setImage(data)
        await interaction.reply({embeds: [embed]})
    }
}