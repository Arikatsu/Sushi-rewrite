const Logger = require('../../utils/logger');
const c = new Logger();
const { exec } = require('child_process');

module.exports = {
    callback: async (message) => {
        const msg = await message.channel.send('Client restarting...')

        try {
            exec("npm run restart", (error, stdout, stderr) => {
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
            await msg.channel.send('Client restarted!')
        } catch (err) {
            c.error(err)
            message.channel.send(`Error restarting client:\n\`\`\`${err}\`\`\``)
        }
    }
}