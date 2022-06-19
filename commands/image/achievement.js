const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('achievement')
        .setDescription('Gives a user specified minecraft style achievement')
        .addStringOption(option => option.setName('achievement').setDescription('your achievement goes here').setRequired(true)),
    async execute(interaction) {
        let ach = interaction.options.getString('achievement')
        const achNoSpaces = ach.replaceAll(' ', '+')
        interaction.reply(`https://minecraftskinstealer.com/achievement/12/Achievement%20Get!/${achNoSpaces}`);
    }
}