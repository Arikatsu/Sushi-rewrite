const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sudo')
        .setDescription('Impersonate someone!')
        .addUserOption(option => option.setName('user').setDescription('user to impersonate').setRequired(true))
        .addStringOption(option => option.setName('text').setDescription('text to say').setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        let text = interaction.options.getString('text')
        let member = interaction.guild.members.cache.get(user.id)
        interaction.reply({ content: 'Sending message...', ephemeral: true })
        const webhook = await interaction.channel.createWebhook(`${member.displayName}`, {
            avatar: member.displayAvatarURL(),
            channel: interaction.channel.id
        })
        await webhook.send(text).then(() => webhook.delete())
    } 
}