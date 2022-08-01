const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const Logger = require('../../utils/logger')
const c = new Logger()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_MESSAGES)
        .setName('purge')
        .setDescription('Purges a number of messages')
        .addIntegerOption(option => option.setName('amount').setDescription('amount of messages to purge').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('user to purge messages from').setRequired(false)),
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES'))
            return interaction.reply("I don't have the `Manage Messages` permission!");
        let amount = interaction.options.getInteger('amount');
        let user = interaction.options.getUser('user');
        if (!user) {
            try {
                await interaction.channel.bulkDelete(amount);
                interaction.reply(`\`${amount}\` messages have been deleted!`)
            }
            catch (err) {
                interaction.reply("I cannot delete messages past 2 weeks!")
            }
        }
        else {
            let member = await interaction.guild.members.fetch(user.id)
            interaction.channel.messages.fetch({
                limit: amount,
            }).then((messages) => {
                messages = messages.filter(m => m.author.id === member.id)
                interaction.channel.bulkDelete(messages).catch(error => c.error(error.stack, __filename));
            });
            interaction.reply(`\`${amount}\` messages have been deleted from \`${user.username}\``)
        }
    }
}