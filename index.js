const { Client, Intents, Collection } = require("discord.js");
const fs = require('fs')
const config = require('./config.json')

const client = new Client({ intents: [32767]});
const express = require('express');
const app = express();
const port = 3000;

client.commands = new Collection();

const handlers = fs.readdirSync("./handlers").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolder = fs.readdirSync("./commands")

app.get('/', (req, res) => res.send('bot is working'));
app.listen(port, () => console.log(`Your app is listening at http://localhost:${port}`));

(async () => {
    for (file of handlers) {
        require(`./functions/${file}`)(client);
    }
})

client.login(config.token)