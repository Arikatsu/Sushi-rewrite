const { SlashCommandBuilder } = require('@discordjs/builders')
const Logger = require('../../utils/logger')
const c = new Logger()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays an audio')
        .addStringOption(o => o.setName('audio').setDescription('the url or the name of the audio you want to play').setRequired(true)),
    async execute(interaction, client) {
        try {
            let query = interaction.options.getString('audio')
            let member = interaction.guild.members.cache.get(interaction.user.id)
            let vc = member.voice.channel

            if (!vc) 
            return interaction.reply('You must be in a voice channel to use this command!')

            if (vc.full)
            return interaction.reply('This voice channel is full!')

            interaction.reply('Checking for pre-requisites...')

            let queue = client.player.getQueue(interaction.guild.id)

            if (!queue) {
                c.raw('No queue found, creating one... for ' + interaction.guild.id, __filename)
                client.player.createQueue(interaction.guild.id, {
                    channel: {
                        metadata: vc
                    }
                })
                queue = client.player.getQueue(interaction.guild.id)
            }

            let audio = await client.player.search(query, { requestedBy: interaction.user }).catch((err) => c.error(err, __filename))

            if (!queue.connection) 
            await queue.connect(vc).catch((err) => c.error(err, __filename).then(queue.destory()))

            queue.addTrack(audio.tracks[0])
            interaction.channel.send({
                embeds: [{
                    title: 'Added to queue',
                    description: `[${audio.tracks[0].title}](${audio.tracks[0].url})`,
                    color: 'RANDOM',
                    timestamp: new Date(),
                    footer: { text: `Requested by ${interaction.user.tag}`, icon_url: interaction.user.avatarURL() }
                }]
            })

            if (!queue.playing) {
                await queue.play()
            } 
        } catch (err) {
            c.error(err, __filename)
            return interaction.channel.send('Error playing the audio!')
        }
    }
}