module.exports = {
    name: 'messageDelete',
    execute(message, client) {
        let imageURLs = []
        if (message.attachments.size > 0) {
            message.attachments.map(attachment => {
                imageURLs.push(attachment.url)
            })
        }
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author,
            images: imageURLs ? imageURLs : null
        })
    }
}