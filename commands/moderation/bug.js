const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.ADMINISTRATOR)
        .setName('bug')
        .setDescription('Sends a bug report')
        .addStringOption(option => option.setName('message').setDescription('message to send').setRequired(true)),
    async execute(interaction, client) {
        let message = interaction.options.getString('message');
        let channel = client.channels.cache.get('970054253525733386')
        channel.send({
            embeds: [{
                color: 0x00ff00,
                title: 'Bug Report',
                description: `${message}`,
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.username}#${interaction.user.discriminator} | ${interaction.guild.id}`,
                    icon_url: interaction.user.avatarURL()
                }
            }]
        });
        interaction.reply("Your bug report has been sent!")
    }
}