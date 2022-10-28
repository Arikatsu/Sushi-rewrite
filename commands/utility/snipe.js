const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('sniped the last deleted message'),
    async execute(interaction, client) {
        const msg = client.snipes.get(interaction.channel.id)
        if (!msg) return interaction.reply("There's nothing to snipe!")
        else if (msg.images != null) {
            let embed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor({ name: msg.author.tag })
                .setDescription(msg.content)
            
            let attachments = []
            msg.images.forEach(image => {
                attachments.push(new MessageAttachment(image))
            })
            await interaction.reply({ files: attachments, embeds: [embed] })
        }
        else {
            let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor({ name: msg.author.tag })
            .setDescription(msg.content)
            await interaction.reply({ embeds: [embed] })
        }
    }
}
