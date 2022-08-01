const Logger = require('../../utils/logger');
const c = new Logger();
const channelId = '970054253525733386'
let debug = false

module.exports = {
    callback: (message, client, ...args) => {
        const channel = client.channels.cache.get(channelId)
        if (!args[0]) 
        return message.reply('Provide arguments dumbass')

        switch(args[0].toLowerCase()) {
            case 'on':
                message.reply('Enabling client debug mode...')
                c.info('Enabling client debug mode...')
                debug = true
                break;
            case 'off':
                message.reply('Disabling client debug mode...')
                c.info('Disabling client debug mode...')
                debug = false
                break;
            default:
                message.reply('Okay? Debug what? deez nuts?')
                break;
        }

        client.on('debug', (logs) => {
            if (debug === true) {
                c.debug(logs)
                channel.send(`\`[DEBUG] ${logs}\``)
            } else {
                return
            }
        })
    }
}