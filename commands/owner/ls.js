const Logger = require('../../utils/logger');
const c = new Logger();
const { exec } = require('child_process');

module.exports = {
    callback: async (message) => {
        try {
            exec("pm2 ls", (error, stdout, stderr) => {
                if (error) {
                    c.err(`error: ${error.message}`)
                    return
                }
                if (stderr) {
                    c.error(`stderr: ${stderr}`)
                    return
                }
                c.info(`stdout: ${stdout}`)
                message.channel.send(`\`\`\`json\n${stdout}\`\`\``)
            })
        } catch (err) {
            c.error(err)
            message.channel.send(`Error restarting client:\n\`\`\`${err}\`\`\``)
        }
    }
}