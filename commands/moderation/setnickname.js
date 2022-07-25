const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_NICKNAMES)
        .setName('setnickname')
        .setDescription('Sets a nickname for a user')
        .addUserOption(option => option.setName('user').setDescription('user to set nickname for').setRequired(true))
        .addStringOption(option => option.setName('nickname').setDescription('nickname to set').setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        let member = interaction.guild.members.cache.get(user.id)
        let nickname = interaction.options.getString('nickname')
        if (member.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0) 
            return interaction.reply('Cannot set or change nickname of this user!')
        member.setNickname(nickname)
        interaction.reply(`Nickname for \`${user.username}\` has been set to \`${nickname}\``)
    }
}