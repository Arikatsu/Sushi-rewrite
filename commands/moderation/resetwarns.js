const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const warns = require('../../models/warnSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.BAN_MEMBERS)
        .setName('resetwarns')
        .setDescription('Resets warns for a user')
        .addUserOption(option => option.setName('user').setDescription('user to reset warns for').setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        
        let warnCheck = await warns.exists({ guild_user_id: `${interaction.guild.id}_${user.id}` })

        if (warnCheck === null) {
            interaction.reply(`\`${user.username}\` has no warns`)
        }

        else {
            await warns.deleteOne({ guild_user_id: `${interaction.guild.id}_${user.id}` })
            await interaction.reply(`Warns for \`${user.username}\` has been reset`)
        }
    }
}