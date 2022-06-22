const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('instagram')
        .setDescription('Fetches the instagram account details by a provided username')
        .addStringOption(option => option.setName('username').setDescription('instagram username of the person to search').setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getString('username')
        let url, response, account, details;
        try {
            url = `https://instagram.com/${user}/?__a=1`;
            response = await axios.get(url)
            account = response.data
            details = account.graphql.user
        } catch (error) {
            return interaction.reply(`Account not found`)
        }
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${details.is_verified ? `${details.username} ☑️` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Total Posts:",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString()
                },
                {
                    name: "Followers:",
                    value: details.edge_followed_by.count.toLocaleString()
                },
                {
                    name: "Following:",
                    value: details.edge_follow.count.toLocaleString()
                }
            )
        await interaction.reply({embeds: [embed]})
    }
}