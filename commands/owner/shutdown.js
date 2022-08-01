const Logger = require('../../utils/logger');
const c = new Logger();
const { exec } = require('child_process');

module.exports = {
    callback: async (message) => {
        await message.channel.send('Client shutting down...')

        try {
            exec("npm run stop", (error, stdout, stderr) => {
                if (error) {
                    c.err(`error: ${error.message}`, __filename)
                    return
                }
                if (stderr) {
                    c.error(`stderr: ${stderr}`, __filename)
                    return
                }
                c.info(`stdout: ${stdout}`, __filename)
            })
        } catch (err) {
            c.error(err, __filename)
            message.channel.send(`Error shutting down that process:\n\`\`\`${err}\`\`\``)
        }
    }
}