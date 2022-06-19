const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('badges')
        .setDescription('Gives a user\'s badges')
        .addUserOption(option => option.setName('user').setDescription('user to get the badges of')),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        if (user) {
            const flags = user.flags.toArray()
            interaction.reply(`${user}'s badges: ${flags.join(', ')}`)
        }
        else {
            const flags = interaction.user.flags.toArray()
            interaction.reply(`${interaction.user}'s badges: ${flags.join(', ')}`)
        }
    }
}