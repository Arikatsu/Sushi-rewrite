const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const ch = require('../../models/suggestChSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_GUILD)
        .setName('setsuggest')
        .setDescription('Sets a suggestion channel for a server where all the suggestions are posted')
        .addChannelOption(option => option.setName('channel').setDescription('channel to set as suggestion').setRequired(true)),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');
        
        let chCheck = await ch.exists({ guild_id: `${interaction.guild.id}` })

        if (chCheck === null) {
            await ch.create({ guild_id: `${interaction.guild.id}`, suggest_ch_id: `${channel.id}` })
            await interaction.reply(`<#${channel.id}> has been set as suggestion channel!`)
        }

        else {
            await ch.findOneAndUpdate({ guild_id: `${interaction.guild.id}` }, { $set: { suggest_ch_id: `${channel.id}` } })
            await interaction.reply(`<#${channel.id}> has been set as suggestion channel!`)
        }
    }
}