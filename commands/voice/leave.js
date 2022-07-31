const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('leaves the current voice channel'),
    async execute(interaction, client) {
        let vc = interaction.guild.me.voice.channel;

        if (!vc)
        return interaction.reply('There is no voice connection to leave!')

        /* Will fix when i wake up cuz idk the correct method ehe*/
        vc.disconnect()
        interaction.reply('<a:amogus_spin:878673061216407613> Left the voice channel!')
    }
}