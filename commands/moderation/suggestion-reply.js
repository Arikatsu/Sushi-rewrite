const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require('discord.js')
const Logger = require('../../utils/logger')
const c = new Logger()
const db = require('../../models/suggestChSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_GUILD)
        .setName('suggestionreply')
        .setDescription('Replies to a suggestion')
        .addStringOption(option => option.setName('suggestion').setDescription('id of the suggestion message to reply to').setRequired(true))
        .addStringOption(option => option.setName('reply').setDescription('your reply to the suggestion').setRequired(true)),
    async execute(interaction, client) {
        const msgId = interaction.options.getString('suggestion')
        const reply = interaction.options.getString('reply')
        await interaction.reply({ content: 'Replying...', ephemeral: true })

        let chCheck = await db.exists({ guild_id: `${interaction.guild.id}` })
        if (chCheck === null) {
            return interaction.editReply('No suggestion channel has been set!')
        }

        let ch = await db.findOne({ guild_id: `${interaction.guild.id}` })
        let chId = ch.suggest_ch_id
        let chan = interaction.guild.channels.cache.get(chId)

        try {
            const suggestion = await chan.messages.fetch(msgId).catch(() => {
                return interaction.editReply('Could not find suggestion!')
            })
            const data = await suggestion.embeds[0]
            let member = client.users.cache.find(u => u.tag === data.author.name)
            const updatedEmbed = new MessageEmbed()
                .setAuthor({ name: `${data.author.name}`, iconURL: data.author.iconURL })
                .setDescription(data.description)
                .setColor("BLUE")
                .setFooter({ text: "Status: Replied" })
                .setTimestamp()
            await suggestion.edit({ embeds: [updatedEmbed] })

            const replyEmbed = new MessageEmbed()
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                .setDescription(reply)
                .setColor(0x2f3136)
                .addFields({ name: 'Link:', value: `[Original Suggestion](https://discord.com/channels/${interaction.guild.id}/${chId}/${msgId})` })
                .setTimestamp()
            await member.send({ embeds: [replyEmbed] })
            await interaction.editReply({ content: 'Suggestion replied!', ephemeral: true })
        } catch(err) {
            c.error(err, __filename)
            return;
        }
    }
}