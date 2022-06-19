const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const random = require("something-random-on-discord").Random

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Gives random advice for no reason')
        .addUserOption(option => option.setName('user').setDescription('user to hug').setRequired(true)),
    async execute(interaction) {
        let data = await random.getAnimeImgURL("hug")
        let user = interaction.options.getUser('user')
        let embed = new MessageEmbed()
        .setDescription(`${interaction.user.username} hugs ${user.username}`)
        .setColor('RANDOM')
        .setImage(data)
        await interaction.reply({embeds: [embed]})
    }
}