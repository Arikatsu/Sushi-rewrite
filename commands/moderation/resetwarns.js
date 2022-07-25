const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const fs = require('fs')
const warns = require('../../db/warns.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.BAN_MEMBERS)
        .setName('resetwarns')
        .setDescription('Resets warns for a user')
        .addUserOption(option => option.setName('user').setDescription('user to reset warns for').setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        let json = null
        try {
            json = JSON.parse(warns)
        } catch (e) {
            json = warns
        }

        if (!json[`warns_for_${interaction.guild.id}_${user.id}`]) {
            interaction.reply(`\`${user.username}\` has no warns`)
        }

        else if (json[`warns_for_${interaction.guild.id}_${user.id}`]) {
            json[`warns_for_${interaction.guild.id}_${user.id}`] = 0
            let data = JSON.stringify(json, null, 2)
            fs.writeFileSync(`./db/warns.json`, data)
            interaction.reply(`Warns for \`${user.username}\` has been reset`)
        }
    }
}