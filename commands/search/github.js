const fetch = require("node-fetch")
const moment = require("moment")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Logger = require('../../utils/logger')
const c = new Logger()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Fetches the GitHub profile of a user of choice')
        .addStringOption(option => option.setName('username').setDescription('GitHub username of the person to fetch').setRequired(true)),
    async execute(interaction) {
        let args = interaction.options.getString('username')
        try {

            fetch(`https://api.github.com/users/${args}`)
                .then(res => res.json()).then(body => {
                    if (body.message) return interaction.reply(`User Not Found | Please Give Me A Valid Username!`)

                    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

                    const embed = new MessageEmbed()
                        .setTitle(`${login}'s Information!`, avatar_url)
                        .setColor(`#211F1F`)
                        .setThumbnail(`${avatar_url}`)
                        .addField(`Username`, `${login}`)
                        .addField(`ID`, `${id}`)
                        .addField(`Bio`, `${bio || "No Bio"}`)
                        .addField(`Public Repositories`, `${public_repos || "None"}`, true)
                        .addField(`Followers`, `${followers}`, true)
                        .addField(`Following`, `${following}`, true)
                        .addField(`Location`, `${location || "No Location"}`)
                        .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))

                    interaction.reply({embeds: [embed]})

                })

        } catch (error) {
            c.error(error);
            return interaction.reply(`Something Went Wrong Try Again Later!`)
        }
    }
}