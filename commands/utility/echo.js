const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Makes the bot say something')
        .addStringOption(option => option.setName('text').setDescription('text to say').setRequired(true)),
    async execute(interaction) {
        let text = interaction.options.getString('text')
        if (interaction.guild.id == '878562477275750430') {
            const logChannel = '970054253525733386'
            logChannel.send(`**${interaction.user.tag}** used the \`echo\` command in **${interaction.channel.name}** with the text \`${text}\``)
        }
        await interaction.reply({ content: 'Message sent!', ephemeral: true })
        interaction.channel.send(text)
    }
}