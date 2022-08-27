const { SlashCommandBuilder } = require('@discordjs/builders')
const { joinVoiceChannel, createAudioResource } = require('@discordjs/voice')
const play = require('play-dl')
const Logger = require('../../utils/logger')
const c = new Logger()
const QueueHelper = require('../../utils/queue-helper')
const q = new QueueHelper()

module.exports = {
    test: true,

    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays an audio')
        .addSubcommand(sub =>
            sub
                .setName('audio')
                .setDescription('plays an audio from a url or search')
                .addStringOption(option => option.setName('query').setDescription('url or name of the audio').setRequired(true))
        )
        .addSubcommand(sub =>
            sub
                .setName('playlist')
                .setDescription('plays an audio from a youtube or spotify playlist')
                .addStringOption(option => option.setName('playlist').setDescription('url of the playlist').setRequired(true))
        ),
    async execute(interaction, client) {
        try {
            let member = interaction.guild.members.cache.get(interaction.user.id)
            let vc = member.voice?.channel

            interaction.reply('Searching for audio...')

            const connection = joinVoiceChannel({
                channelId: vc.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })

            if (interaction.options.getSubcommand() === 'audio') {
                let query = interaction.options.getString('query')
                let audio_info = await play.search(query, {
                    limit: 1
                })

                q.addToQueue(interaction.guild.id, audio_info[0].url)

                if (client.player.state.status === 'idle') {
                    let stream = await play.stream(audio_info[0].url)
                    let resource = createAudioResource(stream.stream, {
                        inputType: stream.type
                    })
                    client.player.play(resource)
                } else if (client.player.state.status === 'playing') {
                    interaction.channel.send('Added to queue')
                }
                connection.subscribe(client.player)

            } else if (interaction.options.getSubcommand() === 'playlist') {
                let playlist = interaction.options.getString('playlist')
                if (playlist.startsWith('https://open.spotify.com/playlist/')) {
                    let pl_info = await play.spotify(playlist)
                    let tracks = pl_info.all_tracks()
                    for (let track of tracks) {
                        console.log(track.url)
                    }
                    connection.subscribe(client.player)
                }
            }
        } catch (err) {
            c.error(err, __filename)
            return interaction.channel.send({ content: 'Error playing the audio!', ephemeral: true })
        }
    }
}
