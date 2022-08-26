const { Client, Collection } = require("discord.js")
const { createAudioPlayer, NoSubscriberBehavior } = require("@discordjs/voice")
const fs = require('fs')
const { token, mongo_srv } = require('./config.json')
const Logger = require('./utils/logger')
const c = new Logger()
const mongoose = require('mongoose')

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

app.get('/', (req, res) => res.send('bot is working'));
app.listen(port, () => c.info(`Your app is listening at http://localhost:${port}`, __filename));

mongoose.connect(mongo_srv, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => c.info('Connected to the database', __filename)).catch(err => c.error(err, __filename));

(async () => {
    for (file of handlers) {
        require(`./handlers/${file}`)(client);
    }
    client.handleEvents(eventFiles, './events')
    client.handleCommands(commandFolder, './commands')
    client.login(token)
})();

client.on("warn", (warning) => c.warn(warning, __filename))

/* VOICE */
client.player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Play
    }
})

client.player.on('error', (err) => {
    c.error(err, __filename)
})