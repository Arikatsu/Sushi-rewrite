const { SlashCommandBuilder } = require('@discordjs/builders');
const Logger = require('../../utils/logger');
const c = new Logger();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('leaves the current voice channel'),
    async execute(interaction, client) {
        let queue = await client.player.getQueue(interaction.guild.id)
        let vc = queue.connection.channel

        if (!vc) 
        return interaction.reply('I am not in a voice channel!')

        if (!queue) {
            c.raw('No queue found, creating one... for ' + interaction.guild.id, __filename)
            client.player.createQueue(interaction.guild.id, {
                channel: {
                    metadata: vc
                }
            })
            queue = client.player.getQueue(interaction.guild.id)
        }

        interaction.reply('<a:amogus_spin:878673061216407613> Left the voice channel!')
        await queue.destory({ disconnect: true }).catch((err) => c.error(err), __filename)
    }
}