const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require ("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Gives the bot\'s info'),
    async execute(interaction, client) {
        let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Sushi\'s info')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '**Version**', value: '2.0.0' },
                { name: '**Users**', value: `${client.users.cache.size} users`},
                { name: '**Servers**', value: `${client.guilds.cache.size} guilds`},
                { name: '**Discord.js**', value: '13.8.0'},
                { name: '**Ping**', value: `${client.ws.ping}ms`},
                { name: '**Commands**', value: `${client.commands.size} commands`}
            )
        interaction.reply({embeds: [embed]})
    }
}