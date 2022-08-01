const Logger = require('../../utils/logger');
const c = new Logger();
const { exec } = require('child_process');

module.exports = {
    callback: async (message) => {
        await message.channel.send('Client shutting down...')

        try {
            exec("npm run stop", (error, stdout, stderr) => {
                if (error) {
                    c.err(`error: ${error.message}`)
                    return
                }
                if (stderr) {
                    c.error(`stderr: ${stderr}`)
                    return
                }
                c.info(`stdout: ${stdout}`)
            })
        } catch (err) {
            c.error(err)
            message.channel.send(`Error shutting down that process:\n\`\`\`${err}\`\`\``)
        }
    }
}