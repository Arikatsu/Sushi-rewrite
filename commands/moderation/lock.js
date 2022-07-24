const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_CHANNELS)
        .setName('lockchannel')
        .setDescription('Locks a channel')
        .addChannelOption(option => option.setName('channel').setDescription('channel to lock').setRequired(false)),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');
        if (!channel) {
            channel = interaction.channel;
        }
        channel.permissionOverwrites.set([{
            id: interaction.guild.id,
            allow: ['VIEW_CHANNEL'],
            deny: ['SEND_MESSAGES']
        }]).then(interaction.reply(`${channel.name} has been locked!`))
    }
}