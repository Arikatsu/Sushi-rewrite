const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_CHANNELS)
        .setName('voicekick')
        .setDescription('Kicks a user from a voice channel')
        .addUserOption(option => option.setName('user').setDescription('user to kick').setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        let member = interaction.guild.members.cache.get(user.id)
        let { channel } = member.voice

        if (!channel) {
            return interaction.reply('User is not in a voice channel')
        }
        member.voice.disconnect()
        interaction.reply(`<@${member.user.id}> has been kicked from ${channel.name}`)
    }
}