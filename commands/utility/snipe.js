const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('sniped the last deleted message'),
    async execute(interaction, message, client) {
        const msg = client.snipes.get(interaction.channel.id)
        if (!msg) return interaction.reply("There's nothing to snipe!")
        else if (msg.image) {
            let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor({ name: msg.author.tag })
            .setDescription(msg.content)
            .setImage(msg.image)
            await interaction.reply({embeds: [embed]})
        }
        else {
            let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor({ name: msg.author.tag })
            .setDescription(msg.content)
            await interaction.reply({embeds: [embed]})
        }
    }
}
