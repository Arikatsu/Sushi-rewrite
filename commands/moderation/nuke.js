const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_CHANNELS)
        .setName('nuke')
        .setDescription('Nukes a channel'),
    async execute(interaction, message) {
        if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS'))
            return interaction.reply("I don't have the `Manage Channels` permission!");
        interaction.reply("Are you sure you want to nuke this channel? (yes/no)")
        let msgfilter = m => m.author.id === interaction.user.id
        interaction.channel.awaitMessages({
            filter: msgfilter,
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(message => {
            message = message.first()
            if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                message.channel.clone().then((ch) => {
                    ch.setParent(message.channel.parent);
                    ch.setPosition(message.channel.position);
                    message.channel.delete().then(() => {
                        ch.send("**Channel Has Been Nuked** \n https://imgur.com/PQPcdqz")
                    })
                });
            } else {
                return message.channel.send(`Channel was not nuked`)
            }
        }).catch(collected => {
            message.channel.send('Timeout');
        });
    }
}
