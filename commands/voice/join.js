const { SlashCommandBuilder } = require('@discordjs/builders');
const Logger = require('../../utils/logger');
const c = new Logger();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('joins a voice channel'),
    async execute(interaction, client) {
        let member = interaction.guild.members.cache.get(interaction.user.id)
        let vc = member.voice.channel
       
        if (!vc) 
        return interaction.reply('You must be in a voice channel to use this command!')

        if (vc.full)
        return interaction.reply('This voice channel is full!')

        let queue = await client.player.getQueue(interaction.guild.id)

        if (!queue) {
            c.raw('No queue found, creating one... for ' + interaction.guild.id)
            client.player.createQueue(interaction.guild.id, {
                channel: {
                    metadata: vc
                }
            })
            queue = client.player.getQueue(interaction.guild.id)
        }

        interaction.reply('<a:amogus_spin:878673061216407613> Joined the voice channel!')
        await queue.connect(vc).catch((err) => c.error(err))
    }
}