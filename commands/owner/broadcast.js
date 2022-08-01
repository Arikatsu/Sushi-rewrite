const Logger = require('../../utils/logger');
const c = new Logger();

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

        message.channel.send({
            embeds: [{
                title: title,
                description: description,
                color: 'RANDOM',
                timestamp: new Date(),
                footer: { text: message.author.tag, icon_url: message.author.avatarURL() }
            }]
        })

        try {
            client.guilds.cache.map((guild) => {
                let found = 0
                guild.channels.cache.map((ch) => {
                    if (found === 0) {
                        if (ch.type === "GUILD_TEXT") {
                            if (ch.permissionsFor(guild.me).has("VIEW_CHANNEL") === true) {
                                if (ch.permissionsFor(guild.me).has("SEND_MESSAGES") === true) {
                                    ch.send({
                                        embeds: [{
                                            title: title,
                                            description: description,
                                            color: 'RANDOM',
                                            timestamp: new Date(),
                                            footer: { text: message.author.tag, icon_url: message.author.avatarURL() }
                                        }]
                                    })
                                    found = 1
                                }
                            }
                        }
                    }
                })
            })
        } catch (err) {
            c.error("Could not send message to a (few) guild(s)! " + err)
        }
    }
}