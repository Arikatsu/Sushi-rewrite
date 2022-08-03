const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { token, clientId } = require('../config.json')
const fs = require('node:fs')
const Logger = require('../utils/logger')
const c = new Logger()

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = []
        for (folder of commandFolders) {
            if (folder === 'owner') continue
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'))
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`)
                client.commands.set(command.data.name, command)
                client.commandArray.push(command.data.toJSON())
            }
        }
        const rest = new REST({ version: '9' }).setToken(token);

        (async () => {
            try {
                c.info('Started refreshing application (/) commands.', __filename)

                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: client.commandArray },
                )

                c.info('Successfully reloaded application (/) commands.', __filename)
            } catch (error) {
                c.error(error, __filename)
            }
        })()
    }
}