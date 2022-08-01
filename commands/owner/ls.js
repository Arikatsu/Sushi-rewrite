const Logger = require('../../utils/logger');
const c = new Logger();
const { exec } = require('child_process');

module.exports = {
    callback: async (message) => {
        try {
            exec("pm2 ls", (error, stdout, stderr) => {
                if (error) {
                    c.err(`error: ${error.message}`, __filename)
                    return
                }
                if (stderr) {
                    c.error(`stderr: ${stderr}`, __filename)
                    return
                }
                c.info(`stdout: ${stdout}`, __filename)
                message.channel.send(`\`\`\`json\n${stdout}\`\`\``)
            })
        } catch (err) {
            c.error(err, __filename)
            message.channel.send(`Error restarting client:\n\`\`\`${err}\`\`\``)
        }
    }
}