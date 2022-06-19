const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pp')
        .setDescription('Rates your or someone else\'s pp size')
        .addUserOption(option => option.setName('user').setDescription('user to rate the pp of')),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        if (!user) {
            if (interaction.user.id == '593787701409611776') return interaction.reply('your dick score is 100/100')
            else {
                const rnd = Math.floor(Math.random() * 100)
                interaction.reply("your dick score is " + rnd + "/100");
            }
        }
        else if (user) {
            if (user.id == '593787701409611776') return interaction.reply(`${user.username}'s dick score is 100/100`)
            else {
                const rnd = Math.floor(Math.random() * 100)
                interaction.reply(`${user.username}'s dick score is ` + rnd + `/100`);
            }
        }
    }
}