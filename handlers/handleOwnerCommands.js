const fs = require('fs')
const config = require('../config.json')
const Logger = require('../utils/logger')
const c = new Logger()

function getFiles(dir, suffix) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    })

    let commandFiles = []

    for (const file of files) {
        if(file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`, suffix)
            ]  
        } else if (file.name.endsWith(suffix)) {
            commandFiles.push(`../commands/owner/${file.name}`)
        }
    }

    return commandFiles
}

module.exports = async (client) => {
    const commands = {}

    const suffix = '.js'

    const commandFiles = await getFiles(`./commands/owner`, suffix)

    for (const command of commandFiles) {
        let commandFile = require(command)
        if (commandFile.default) commandFile = commandFile.default

        const split = command.replace(/\\/g, '/').split('/')
        const commandName = split[split.length -1].replace(suffix, '')

        commands[commandName.toLowerCase()] = commandFile
    }

    c.info(`Logging owner commands: [${Object.keys(commands).join(', ')}]`, __filename)

    client.on('messageCreate', (message) => {
        if (message.author.bot || message.author.id != config.ownerId) return

        var commandName
        if (message.content.startsWith(config.prefix)) {
            var args = message.content.slice(1).split(/ +/)
            commandName = args.shift().toLowerCase()
        }

        if (!commands[commandName]) return

        try {
            commands[commandName].callback(message, client, ...args)
        } catch (error) {
           c.error(error, __filename)
        }
    })
}
