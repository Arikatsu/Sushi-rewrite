const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_ROLES)
        .setName('removerole')
        .setDescription('Removes a role from a user')
        .addUserOption(option => option.setName('user').setDescription('user to remove role from').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('role to remove').setRequired(true)),
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has('MANAGE_ROLES'))
            return interaction.reply("I don't have the `Manage Roles` permission!");
        let user = interaction.options.getUser('user');
        let role = interaction.options.getRole('role');
        let member = await interaction.guild.members.fetch(user.id)
        if (member.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0)
            return interaction.reply("I cannot remove role from this user because he/she has a higher role than me!");
        
        if (role.managed) 
            return interaction.reply("I cannot remove this role because it is managed!");
        
        if (interaction.guild.me.roles.highest.comparePositionTo(role) <= 0) 
            return interaction.reply("I cannot remove this role because it is higher than my highest role!"); 
        
        if (!member.roles.cache.has(role.id)) 
            return interaction.reply("This user does not have this role!");
        
        member.roles.remove(role.id)
        interaction.reply(`\`${user.username}\` has been removed the role \`${role.name}\``)
    }
}