const Logger = require('../../utils/logger');
const c = new Logger();

module.exports = {
    callback: async (message, client, ...args) => {
        if (!args[0])
        return message.reply('Provide guild id lol')

        const guild = client.guilds.cache.get(args[0])

        if (!guild)
        return message.reply(' Either I\'m not in that guild or that ain\'t even a guild id lmao')

        let channel = guild.channels.cache.find(c => c.type === 'GUILD_TEXT')

        if (!channel)
        return message.reply(' That guild has no text channels')

        let invite = await channel.createInvite({ temporary: false, maxAge: 0 }).catch(err => { c.error(err); return message.reply(' Error creating invite') })

        message.channel.send(`${invite.url}`)
    }
}