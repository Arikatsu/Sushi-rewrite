const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Gives the bot\'s uptime'),
    async execute(interaction, client) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let embed = new MessageEmbed()
            .setTitle('**Sushi\'s Uptime**')
            .setDescription(`${days}d ${hours}h ${minutes}m ${seconds}s`)
            .setColor('RANDOM')
            .setTimestamp()
        
        interaction.reply({embeds: [embed]})
    }
}