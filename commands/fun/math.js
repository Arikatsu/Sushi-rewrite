const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const math = require("mathjs")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('evaluate')
        .setDescription('Evaluates a math expression')
        .addStringOption(option => option.setName('expression').setDescription('your math expression').setRequired(true)),
    async execute(interaction) {
        let exp = interaction.options.getString('expression')
        try {
            if (!exp) return interaction.reply("Please Give Me Equation!");
            let ans = math.evaluate(exp)
            const embed = new MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle(`Result`)
                .setDescription(ans.toString())
            interaction.reply({embeds: [embed]});
        } catch (error) {
            interaction.reply(`Please Give Me Valid Equation | Try Again Later!`).then(() => console.log(error));
        }
    }
}