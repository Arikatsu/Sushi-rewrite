const { MessageEmbed } = require('discord.js');

module.exports = {
    callback: async (message, client, ...args) => {
        let i0 = 0
        let i1 = 10
        let page = 1

        let description = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
            .slice(0, 10)
            .join("\n\n")

        let embed = new MessageEmbed()
            .setTitle(`Total Servers: ${client.guilds.cache.size}`)
            .setColor('RANDOM')
            .setFooter({ text: `Page: ${page}/${Math.ceil(client.guilds.cache.size / 10)}` })
            .setDescription(description)

        let msg = await message.channel.send({ embeds: [embed]})

        await msg.react("⬅")
        await msg.react("➡")
        await msg.react("❌")

        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id)

        collector.on("collect", async (reaction, user) => {
            if (reaction._emoji.name === "⬅") {
                i0 = i0 - 10;
                i1 = i1 - 10;
                page = page - 1;

                if (i0 + 1 < 0) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }

                description = client.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                    .slice(0, 10)
                    .join("\n\n")

                embed
                    .setFooter({ text: `Page: ${page}/${Math.ceil(client.guilds.cache.size / 10 + 1)}` })
                    .setDescription(description)
                msg.edit({ embeds: [embed]})
            }

            if (reaction._emoji.name === "⬅") {
                i0 = i0 + 10;
                i1 = i1 + 10;
                page = page + 1;

                if (i1 > client.guilds.cache.size + 10) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }

                description = client.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                    .slice(0, 10)
                    .join("\n\n")

                embed
                    .setFooter({ text: `Page: ${page}/${Math.ceil(client.guilds.cache.size / 10 + 1)}` })
                    .setDescription(description)
                msg.edit({ embeds: [embed]})
            }

            if (reaction._emoji.name === "❌") {
                return msg.delete()
            }
        })
    }
}