const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_CHANNELS)
        .setName('slowmode')
        .setDescription('Sets a slowmode for a channel')
        .addChannelOption(option => option.setName('channel').setDescription('channel to set slowmode for').setRequired(true))
        .addIntegerOption(option => option.setName('time').setDescription('time in seconds, 0 to remove slowmode').setRequired(true)),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel')
        let time = interaction.options.getInteger('time')
        channel.setRateLimitPerUser(time)
        if (time === 0)
        interaction.reply(`Slowmode for \`${channel.name}\` has been removed`)
        else        
        interaction.reply(`Slowmode for \`${channel.name}\` has been set to \`${time}s\``)
    }
}