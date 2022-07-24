const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js') 

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.BAN_MEMBERS)
        .setName('ban')
        .setDescription('Bans a user')
        .addUserOption(option => option.setName('user').setDescription('user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('reason to ban').setRequired(false)),
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has('BAN_MEMBERS'))
            return interaction.reply("I don't have the `Ban Members` permission!");
        let user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason provided";
        if (user.id === interaction.guild.ownerID) return interaction.reply("I cannot ban the owner!");
        if (user.id === interaction.guild.me.id) return interaction.reply("I cannot ban myself!");
        if (user.id === interaction.user.id) return interaction.reply("You cannot ban yourself!");
        let member = await interaction.guild.members.fetch(user.id)
        if (member.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0)
            return interaction.reply("I cannot ban this user because he/she has a higher role than me!");
        interaction.guild.members.ban(member.id)
        interaction.reply(`\`${user.username}\` has been banned for \`${reason}\``)
    }
}