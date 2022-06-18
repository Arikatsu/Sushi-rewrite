module.exports = {
    name: 'messageDelete',
    execute(message, client) {
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author,
            image: message.attachments ? message.attachments.proxyURL : null
        })
    }
}