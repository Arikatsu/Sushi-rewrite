const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wr')
        .setDescription('Rates you or someone else as a waifu')
        .addUserOption(option => option.setName('user').setDescription('user to rate waifu as')),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        if (!user) {
            if (interaction.user.id == '775042627837100033') return interaction.reply('you are a 100/100 waifu')
            else {
                const rnd = Math.floor(Math.random() * 100)
                interaction.reply("you are a "+ rnd +"/100 waifu");
            }
        }
        else if (user) {
            if (user.id == '775042627837100033') return interaction.reply(`${user.username} is a 100/100 waifu`)
            else {
                const rnd = Math.floor(Math.random() * 100)
                interaction.reply(`${user.username} is a ` + rnd + `/100 waifu`);
            }
        }
    }
}