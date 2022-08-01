const Logger = require('../../utils/logger');
const c = new Logger();

const clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
        text = await text;

    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 })

    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replaceAll(client.token, "<CLIENT_TOKEN>")

    return text;
}

module.exports = {
    callback: async (message, client, ...args) => {
        if (!args[0])
        return message.reply('Provide arguments dumbass')

        try {
            const evaled = eval(args.join(" ").replace(/```/g, '')) 
            const cleaned = await clean(client, evaled)
            message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``)
        } catch (err) {
            c.error(err, __filename)
            message.channel.send(`\`\`\`\n${err}\n\`\`\``)
        }
    }
}