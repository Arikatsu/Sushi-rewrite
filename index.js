const { Client, Collection } = require("discord.js");
const fs = require('fs')
const { token, dbLink } = require('./config.json')

const client = new Client({intents: 32767})
const express = require('express');
const app = express();
const port = 3000;

client.commands = new Collection();
client.snipes = new Collection();

const handlers = fs.readdirSync("./handlers").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolder = fs.readdirSync("./commands")

app.get('/', (req, res) => res.send('bot is working'));
app.listen(port, () => console.log(`Your app is listening at http://localhost:${port}`));

(async () => {
    for (file of handlers) {
        require(`./handlers/${file}`)(client);
    }
    client.handleEvents(eventFiles, './events')
    client.handleCommands(commandFolder, './commands')
    client.login(token)
})();
