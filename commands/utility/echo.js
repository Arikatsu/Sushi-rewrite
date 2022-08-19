const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Makes the bot say something')
        .addStringOption(option => option.setName('text').setDescription('text to say').setRequired(true)),
    async execute(interaction) {
        let text = interaction.options.getString('text')
        await interaction.reply({ content: 'Message sent!', ephemeral: true })
        interaction.channel.send(text)
    }
}