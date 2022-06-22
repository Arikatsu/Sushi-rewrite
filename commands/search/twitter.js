const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const { stripIndents } = require("common-tags")
const twitter = require("twitter-api.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twitter')
        .setDescription('Fetches details about a twitter account')
        .addStringOption(option => option.setName('username').setDescription('username of the person on twitter').setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getString('username')
        try {
            const body = await twitter.users(user)
            const tweet = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(`@${body.screen_name.toLowerCase()}`, body.verified ? "https://emoji.gg/assets/emoji/6817_Discord_Verified.png" : null)
                .setDescription(stripIndents` ${body.description}
            \`•\` Followers: **${(body.followers_count).toLocaleString()}**
            \`•\` Following: **${(body.friends_count).toLocaleString()}**
            \`•\` Tweets: **${(body.statuses_count).toLocaleString()}**
            \`•\` Account Created At: ${body.created_at}`)
                .setFooter({text: `Twitter ID: ${body.id}`, iconURL: "https://abs.twimg.com/favicons/twitter.ico"})
                .setThumbnail(body.profile_image_url_https.replace('_normal', ''))
                .setImage(body.profile_banner_url)  
            await interaction.reply({embeds: [tweet]})
        } catch (e) {
            if (e.status === 403) return interaction.reply("This user private mode, or deleted account")
            else if (e.status === 404) return interaction.reply("Not Found")
            else return interaction.reply(`Unknown error: \`${e.message}\``)
        }
    }
}