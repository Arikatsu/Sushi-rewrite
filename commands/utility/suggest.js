const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const db = require('../../models/suggestChSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Sends a suggestion to the suggestion channel')
        .addStringOption(option => option.setName('suggestion').setDescription('suggestion to send').setRequired(true)),
    async execute(interaction) {
        let suggestion = interaction.options.getString('suggestion')
        let chCheck = await db.exists({ guild_id: `${interaction.guild.id}` })
        if (chCheck === null) {
            return interaction.reply('No suggestion channel has been set!')
        }

        let ch = await db.findOne({ guild_id: `${interaction.guild.id}` })
        let chId = ch.suggest_ch_id
        let chan = await interaction.guild.channels.cache.get(chId.toString())
        
        let embed = new MessageEmbed()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
            .setDescription(suggestion)
            .setColor(0x2f3136)
            .setFooter({ text: 'Status: pending' })
            .setTimestamp()

        const sugEmbed = await chan.send({ embeds: [embed] })
        await sugEmbed.react('✅')
        await sugEmbed.react('❌')

        interaction.reply({ content: 'Suggestion sent! You will get a DM if your suggestion gets a reply.', ephemeral: true })   
    }
}