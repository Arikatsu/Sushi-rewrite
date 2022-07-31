const { SlashCommandBuilder } = require('@discordjs/builders');
const Logger = require('../../utils/logger');
const c = new Logger();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clears the current music queue'),
    async execute(interaction, client) {
        const queue = await client.player.getQueue(interaction.guild.id)

        if (!queue || !queue.playing) {
            interaction.reply('There is no music playing!')
            try {
                queue.previousTracks = []
            } catch {
                c.error('No previous tracks to clear!')
            }
        }

        let member = interaction.guild.members.cache.get(interaction.user.id)
        
        if (!member.voice.channel)
        return interaction.reply('You must be in a voice channel to use this command!')

        if (member.voice.channel.id != interaction.guild.me.voice.channel.id)
        return interaction.reply('You must be in the same voice channel as the music player to use this command!')

        if (queue.tracks.length < 1)
        return interaction.reply('There is currently no song in the queue!')

        interaction.reply("Cleared the queue!")
        queue.clear()
    }
}