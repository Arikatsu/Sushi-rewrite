const fs = require('fs')

let queueJSON = fs.readFileSync('./utils/queue.json')
let queues = null
try {
    queues = JSON.parse(queueJSON)
} catch(e) {
    queues = queueJSON
}

class QueueHelper {
    constructor() {
        this.queues = queues
    }

    getQueue(guildId) {
        return this.queues[guildId] || "No queue found"
    }

    addToQueue(guildId, resource) {
        if (!this.queues[guildId]) {
            this.queues[guildId] = []
        }
        this.queues[guildId].push(resource)
        fs.writeFileSync('./utils/queue.json', JSON.stringify(this.queues, null, 2))
    }

    removeFromQueue(guildId, index) {
        this.queues[guildId].splice(index, 1)
        fs.writeFileSync('./utils/queue.json', JSON.stringify(this.queues, null, 2))
    }

    clearQueue(guildId) {
        this.queues[guildId] = []
        fs.writeFileSync('./utils/queue.json', JSON.stringify(this.queues, null, 2))
    }

    getSong(guildId, index) {
        return this.queues[guildId][index]
    }

    getQueueLength(guildId) {
        return this.queues[guildId].length
    }

    shuffleQueue(guildId) {
        let queue = this.queues[guildId]
        let currentIndex = queue.length
        let temporaryValue, randomIndex
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = queue[currentIndex]
            queue[currentIndex] = queue[randomIndex]
            queue[randomIndex] = temporaryValue
        }
        fs.writeFileSync('./utils/queue.json', JSON.stringify(this.queues, null, 2))
    }

    getRandomSong(guildId) {
        let queue = this.queues[guildId]
        let index = Math.floor(Math.random() * queue.length)
        return queue[index]
    }

    getNextSong(guildId) {
        let queue = this.queues[guildId]
        let index = 0
        return queue[index]
    }
}

module.exports = QueueHelper;