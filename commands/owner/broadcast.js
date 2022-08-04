const { MessageEmbed } = require("discord.js");
const Logger = require('../../utils/logger')
const c = new Logger()

module.exports = {
    callback: async (message, client, ...args) => {
        if (!args[0])
            return

        let checker = args.indexOf('|')
        if (checker === -1) return

        let titleArray = args.slice(0, checker)
        let descriptionArray = args.slice(checker + 1)

        let title = titleArray.join(' ')
        let description = descriptionArray.join(' ')

        const msg = new MessageEmbed()
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTitle(title)
            .setDescription(description)
            .setColor("RANDOM")
            .setTimestamp()

        message.channel.send({ embeds: [msg] })

        try {
            client.guilds.cache.map((guild) => {
                let channel = guild.systemChannel || guild.channels.cache.find(c => c.type === 'GUILD_TEXT')
                channel.send({ embeds: [msg] })
            })
        } catch (err) {
            c.error("Could not send message to a (few) guild(s)! " + err, __filename)
        }
    }
}