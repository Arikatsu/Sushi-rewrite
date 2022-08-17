const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const warns = require('../../models/warnSchema')
const Logger = require('../../utils/logger')
const c = new Logger()

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

        let member = await interaction.guild.members.fetch(user.id)

        let warnCheck = await warns.exists({ guild_user_id: `${interaction.guild.id}_${user.id}` })

        if (warnCheck === null) {
            warns.create({
                guild_user_id: `${interaction.guild.id}_${user.id}`,
                warns_num: 1
            })
            await interaction.reply(`\`${user.username}\` has been warned for \`${reason}\` \n Warning number: \`1\``)
            await user.send(`You have been warned in \`${interaction.guild.name}\` for \`${reason}\``)
        }

        else {
            let warnsNum = await warns.findOne({ guild_user_id: `${interaction.guild.id}_${user.id}` })
            let warnDoc = await warns.findOneAndUpdate({ guild_user_id: `${interaction.guild.id}_${user.id}` }, { $set: { warns_num: warnsNum.warns_num + 1 }}, { new: true })
            await interaction.reply(`\`${user.username}\` has been warned for \`${reason}\` \n Warning number: \`${warnDoc.warns_num}\``)
            await user.send(`You have been warned in \`${interaction.guild.name}\` for \`${reason}\``)
        }

        let warnDoc = await warns.findOne({ guild_user_id: `${interaction.guild.id}_${user.id}` })

        if (warnDoc.warns_num >= 3) {
            user.send(`You have been banned in \`${interaction.guild.name}\` for \`${reason}\` and for reaching 3 or more warnings`).then(() => interaction.guild.members.ban(member.id)).catch(err => { interaction.reply('Could not ban user'); c.error(err, __filename); return })
            interaction.channel.send(`\`${user.username}\` has been banned for having 3 or more warnings`)
            await warns.deleteOne({ guild_user_id: `${interaction.guild.id}_${user.id}` })
        }
    }
}