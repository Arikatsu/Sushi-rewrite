const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const fs = require('fs')
const ch = require('../../db/welcome-ch.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.ADMINISTRATOR)
        .setName('setwelcome')
        .setDescription('Sets a welcome channel for a server')
        .addChannelOption(option => option.setName('channel').setDescription('channel to set as welcome').setRequired(true)),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');
        if (!channel) {
            channel = interaction.channel;
        }
        let json = null
        try {
            json = JSON.parse(ch)
        } catch (e) {
            json = ch
        }
        json[interaction.guild.id] = channel.id
        let data = JSON.stringify(json, null, 2)
        fs.writeFileSync(`./db/welcome-ch.json`, data)
        interaction.reply(`<#${channel.id}> has been set as welcome channel!`)
    }
}