const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const random = require("something-random-on-discord").Random

module.exports = {
    data: new SlashCommandBuilder()
        .setName('punch')
        .setDescription('Punch someone in the server')
        .addUserOption(option => option.setName('user').setDescription('user to punch').setRequired(true)),
    async execute(interaction) {
        let data = await random.getAnimeImgURL("punch")
        let user = interaction.options.getUser('user')
        let embed = new MessageEmbed()
        .setDescription(`${interaction.user.username} punches ${user.username}`)
        .setColor('RANDOM')
        .setImage(data)
        await interaction.reply({embeds: [embed]})
    }
}