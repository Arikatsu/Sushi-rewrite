const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clears the current music queue'),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guild.id)

        if (!queue || !queue.playing) 
        return interaction.reply('There is no music playing!')

        
    }
}