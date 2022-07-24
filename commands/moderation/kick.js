const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.KICK_MEMBERS)
        .setName('kick')
        .setDescription('Kicks a user')
        .addUserOption(option => option.setName('user').setDescription('user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('reason to kick').setRequired(false)),
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has('KICK_MEMBERS'))
            return interaction.reply("I don't have the `Kick Members` permission!");
        let user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason provided";
        if (user.id === interaction.guild.ownerID) return interaction.reply("I cannot kick the owner!");
        if (user.id === interaction.guild.me.id) return interaction.reply("I cannot kick myself!");
        if (user.id === interaction.user.id) return interaction.reply("You cannot kick yourself!");
        let member = await interaction.guild.members.fetch(user.id)
        if (member.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0)
            return interaction.reply("I cannot kick this user because he/she has a higher role than me!");
        interaction.guild.members.kick(member.id)
        interaction.reply(`\`${user.username}\` has been kicked for \`${reason}\``)
    }
}