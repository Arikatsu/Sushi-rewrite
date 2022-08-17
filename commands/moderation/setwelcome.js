const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const ch = require('../../models/welcomeChSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.ADMINISTRATOR)
        .setName('setwelcome')
        .setDescription('Sets a welcome channel for a server')
        .addChannelOption(option => option.setName('channel').setDescription('channel to set as welcome').setRequired(true)),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');
        
        let chCheck = await ch.exists({ guild_id: `${interaction.guild.id}` })

        if (chCheck === null) {
            await ch.create({ guild_id: `${interaction.guild.id}`, wel_ch_id: `${channel.id}` })
            await interaction.reply(`<#${channel.id}> has been set as welcome channel!`)
        }

        else {
            await ch.findOneAndUpdate({ guild_id: `${interaction.guild.id}` }, { $set: { wel_ch_id: `${channel.id}` } })
            await interaction.reply(`<#${channel.id}> has been set as welcome channel!`)
        }
    }
}