module.exports = (client) => {
    client.handleEvents = async (eventFiles, path) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (message, ...args) => event.execute(message, ...args, client));
            } else {
                client.on(event.name, (message, ...args) => event.execute(message, ...args, client));
            }
        }
    }
}