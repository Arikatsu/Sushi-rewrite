const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slaps someone')
        .addUserOption(option => option.setName('user').setDescription('user to slap').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('say something why you are slapping the user').setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason')
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setImage(encodeURI(`https://vacefron.nl/api/batmanslap?text1=bruh&text2=${reason}&batman=${interaction.user.avatarURL({ format: "png" })}&robin=${user.displayAvatarURL({ format: "png" })}`))
        await interaction.reply({embeds: [embed]})
    }
}