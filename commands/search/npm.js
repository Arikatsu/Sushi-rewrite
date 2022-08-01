const fetch = require("node-fetch")
const moment = require("moment")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require('discord.js')
const Logger = require('../../utils/logger')
const c = new Logger()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('npm')
        .setDescription('Fetches detailsaboutan npm package')
        .addStringOption(option => option.setName('query').setDescription('name of the npm package').setRequired(true)),
    async execute(interaction) {
        let query = interaction.options.getString('query')
        const res = await fetch(`https://registry.npmjs.com/${encodeURIComponent(query)}`).catch(err => c.error(err, __filename))
        if (res.status === 404)
            return interaction.reply('No search results found, maybe try searching for something that exists.')
        const body = await res.json()
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(body.name)
            .setURL(`https://www.npmjs.com/package/${body.name}`)
            .setDescription(body.description || 'No description.')
            .addField('❯ Version', body['dist-tags'].latest, true)
            .addField('❯ License', body.license || 'None', true)
            .addField('❯ Author', body.author ? body.author.name : '???', true)
            .addField('❯ Creation Date', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true)
            .addField('❯ Modification Date', body.time.modified ? moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss') : 'None', true)
            .addField('❯ Repository', body.repository ? `[View Here](${body.repository.url.split('+')[1]})` : 'None', true)
            .addField('❯ Maintainers', body.maintainers.map(user => user.name).join(', '))
        await interaction.reply({ embeds: [embed] })
    }
}