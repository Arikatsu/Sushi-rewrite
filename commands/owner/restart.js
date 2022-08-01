const Logger = require('../../utils/logger');
const c = new Logger();
const { exec } = require('child_process');

module.exports = {
    callback: async (message) => {
        const msg = await message.channel.send('Client restarting...')

        try {
            exec("npm run restart", (error, stdout, stderr) => {
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
            await msg.channel.send('Client restarted!')
        } catch (err) {
            c.error(err, __filename)
            message.channel.send(`Error restarting client:\n\`\`\`${err}\`\`\``)
        }
    }
}