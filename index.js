const { Client, Collection } = require("discord.js");
const fs = require('fs')
const { token } = require('./config.json')
const { Player } = require('discord-player')
const Logger = require('./utils/logger')
const c = new Logger()

const client = new Client({
    presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: 'deez nuts',
            type: 'COMPETING'
        }],
    },
    intents: 32767
})
const express = require('express');
const app = express();
const port = 3000;

client.commands = new Collection();
client.snipes = new Collection();

const handlers = fs.readdirSync("./handlers").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolder = fs.readdirSync("./commands")

const player = new Player(client, {
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: false,
    leaveOnEmptyCooldown: 60000,
    autoSelfDeaf: true,
    initialVolume: 100
})

client.player = player

app.get('/', (req, res) => res.send('bot is working'));
app.listen(port, () => c.info(`Your app is listening at http://localhost:${port}`));

(async () => {
    for (file of handlers) {
        require(`./handlers/${file}`)(client);
    }
    client.handleEvents(eventFiles, './events')
    client.handleCommands(commandFolder, './commands')
    client.login(token)
})();

client.on("warn", (warning) => c.warn(warning))

player.on("error", (queue, error) => {
    c.error(error)
})

player.on('connectionError', (queue, error) => {
    c.error(`Error emitted from the connection ${error.message}`);
})