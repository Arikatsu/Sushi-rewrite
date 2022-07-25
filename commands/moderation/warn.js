const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const fs = require('fs')
const warns = require('../../db/warns.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.BAN_MEMBERS)
        .setName('warn')
        .setDescription('Warns a user')
        .addUserOption(option => option.setName('user').setDescription('user to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('reason to warn').setRequired(false)),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason')
        if (!reason)
            reason = "No reason provided"

        if (user.id === interaction.guild.ownerID)
            return interaction.reply("You cannot warn the owner lol")

        if (user.bot)
            return interaction.reply("You cannot warn bots!")

        let json = null
        try {
            json = JSON.parse(warns)
        } catch (e) {
            json = warns
        }

        let member = await interaction.guild.members.fetch(user.id)

        if (!json[`warns_for_${interaction.guild.id}_${user.id}`]) {
            json[`warns_for_${interaction.guild.id}_${user.id}`] = 1
            let data = JSON.stringify(json, null, 2)
            fs.writeFileSync(`./db/warns.json`, data)
            interaction.reply(`\`${user.username}\` has been warned for \`${reason}\` \n Warning number: \`1\``)
            user.send(`You have been warned in \`${interaction.guild.name}\` for \`${reason}\``)
        }

        else if (json[`warns_for_${interaction.guild.id}_${user.id}`]) {
            json[`warns_for_${interaction.guild.id}_${user.id}`]++
            let data = JSON.stringify(json, null, 2)
            fs.writeFileSync(`./db/warns.json`, data)
            interaction.reply(`\`${user.username}\` has been warned for \`${reason}\` \n Warning number: \`${json[`warns_for_${interaction.guild.id}_${user.id}`]}\``)
            user.send(`You have been warned in \`${interaction.guild.name}\` for \`${reason}\``)
        }

        if (json[`warns_for_${interaction.guild.id}_${user.id}`] >= 3) {
            user.send(`You have been banned in \`${interaction.guild.name}\` for \`${reason}\` and for reaching 3 or more warnings`).then(() => interaction.guild.members.ban(member.id))
            interaction.channel.send(`\`${user.username}\` has been banned for having 3 or more warnings`)
            json[`warns_for_${interaction.guild.id}_${user.id}`] = 0
            let data = JSON.stringify(json, null, 2)
            fs.writeFileSync(`./db/warns.json`, data)
        }
    }
}