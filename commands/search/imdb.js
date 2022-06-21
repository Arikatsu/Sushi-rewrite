const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const imdb = require("imdb-api")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imdb')
        .setDescription('Get information about a tv series or a movie')
        .addStringOption(option => option.setName('query').setDescription('Name of the tv series or movie').setRequired(true)),
    async execute(interaction) {
        let args = interaction.options.getString('query')
        const imdbFetch = new imdb.Client({ apiKey: "5e36f0db" })
        let fetchedItem = await imdbFetch.get({ 'name': args })

        let embed = new MessageEmbed()
            .setTitle(fetchedItem.title)
            .setColor("RANDOM")
            .setThumbnail(fetchedItem.poster)
            .setDescription(fetchedItem.plot)
            .setFooter({ text: `Ratings: ${fetchedItem.rating}`})
            .addField("Country", fetchedItem.country, true)
            .addField("Languages", fetchedItem.languages, true)
            .addField("Type", fetchedItem.type, true)
        await interaction.reply({embeds: [embed]})
    }
}