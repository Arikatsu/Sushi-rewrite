const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueueRepeatMode } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('looping parameters for the current queue')
        .addBooleanOption(o => o.setName('loop').setDescription('disable or enable looping').setRequired(true)),
    async execute(interaction, client) {
        let member = interaction.guild.members.cache.get(interaction.user.id)
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
        return interaction.reply('There is no music playing!');

        if (!member.voice.channel)
        return interaction.reply('You must be in a voice channel to use this command!')

        let loop = interaction.options.getBoolean('loop')

        switch (loop) {
            case true:
                queue.setRepeatMode(QueueRepeatMode.QUEUE)
                interaction.reply('Looping is now enabled!')
                break;
            case false:
                queue.setRepeatMode(QueueRepeatMode.OFF)
                interaction.reply('Looping is now disabled!')
                break;
            default:
                interaction.reply('Invalid option!')
                break;
        }
    }
}