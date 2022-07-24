const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MODERATE_MEMBERS) 
        .setName('timeout')
        .setDescription('Timeouts a user')
        .addUserOption(option => option.setName('user').setDescription('user to timeout').setRequired(true))
        .addIntegerOption(option => option.setName('time').setDescription('time to timeout in minutes').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('reason to timeout').setRequired(false)),
    async execute(interaction) {
        let user = interaction.options.getUser('user');
        let time = interaction.options.getInteger('time');
        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason provided";
        if (user.id === interaction.guild.ownerID) return interaction.reply("I cannot timeout the owner!");
        if (user.id === interaction.guild.me.id) return interaction.reply("I cannot timeout myself!");
        if (user.id === interaction.user.id) return interaction.reply("You cannot timeout yourself!");
        let member = await interaction.guild.members.fetch(user.id)
        if (member.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0)
            return interaction.reply("I cannot timeout this user because he/she has a higher role than me!");
        member.timeout(time * 60000)
        interaction.reply(`\`${user.username}\` has been timed out for \`${time} minutes\` for \`${reason}\``)
    }
}