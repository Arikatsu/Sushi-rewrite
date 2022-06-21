const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servericon')
        .setDescription('Gives the server\'s icon'),
    async execute(interaction) {
        let embed = new MessageEmbed()
            .setDescription(`[Download](${message.guild.iconURL({ dynamic: true, size: 1024 })})`)
            .setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor("RANDOM")
        interaction.reply(embed)
    }
}