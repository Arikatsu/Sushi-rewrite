const Logger = require('../../utils/logger');
const c = new Logger();

module.exports = {
    callback: async (message, ...args) => {
        await message.channel.send('Client shutting down...')

        try {
            process.exit(args[0] || 1)
        } catch (err) {
            c.error(err)
            message.channel.send('Error shutting down that process')
        }
    }
}