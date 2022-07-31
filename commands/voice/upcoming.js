const { SlashCommandBuilder } = require('@discordjs/builders')
const Logger = require('../../utils/logger')
const c = new Logger()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('upcoming')
        .setDescription('shows the upcoming songs in the queue'),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guild.id)

        if (!queue) 
        return interaction.reply('There is no queue!')

        let member = interaction.guild.members.cache.get(interaction.user.id)
        
        if (!member.voice.channel)
        return interaction.reply('You must be in a voice channel to use this command!')

        if (member.voice.channel.id !== interaction.guild.me.voice.channel.id)
        return interaction.reply('You must be in the same voice channel as the music player to use this command!')

        if (queue.tracks.length < 1)
        return interaction.reply("There is currently no upcoming songs in the queue.")

        let embed = {
            title: 'Next up...',
            description: queue.tracks.map((track, index) => `${index + 1}. [${track.title}](${track.url})`).join('\n'),
            color: 'RANDOM',
            timestamp: new Date(),
            footer: {
                text: `Requested by ${interaction.user.tag}`
            }
        }

        interaction.reply({ embeds: [embed] })
    }
}    