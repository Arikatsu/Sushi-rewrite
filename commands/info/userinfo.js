const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Logger = require('../../utils/logger')
const c = new Logger()
const moment = require('moment')

const stat = {
    online: "https://emoji.gg/assets/emoji/9166_online.png",
    idle: "https://emoji.gg/assets/emoji/3929_idle.png",
    dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
    offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Gives info about a user in the server')
        .addUserOption(option => option.setName('user').setDescription('user to get the info of')),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        if (!user) {
            user = interaction.user
        }
        let member = await interaction.guild.members.fetch(user.id)
        let badges = await user.flags
        badges = await badges ? badges.toArray() : ["None"]

        let newbadges = [];
        badges.forEach(m => {
            newbadges.push(m.replace("_", " "))
        })

        let badgeString = newbadges.join(", ").toLowerCase()

        let embed = new MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setColor('RANDOM')

        let array = []
        if (member.presence.activities.length) {

            let data = member.presence.activities;

            for (let i = 0; i < data.length; i++) {
                let name = data[i].name || "None"
                let xname = data[i].details || "None"
                let zname = data[i].state || "None"
                let type = data[i].type

                array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)

                if (data[i].name === "Spotify") {
                    embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
                }

                embed.setDescription(array.join("\n"))

            }
        }

        embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
        embed.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
        if (member.nickname !== null) embed.addField("Nickname", member.nickname)

        let time = moment(user.createdAt).format("LLLL")

        embed.addFields(
            { name: "Account Created At", value: `${time}` },
            { name: "Information", value: `ID: \`${user.id}\`\nDiscriminator: ${user.discriminator}\nBot: ${user.bot}` },
            { name: "Badges", value: `${badgeString}` || "None" }
        )
            .setFooter({ text: member.presence.status, iconURL: stat[member.presence.status] })

        c.raw(member.presence.status, __filename)
        return interaction.reply({ embeds: [embed] }).catch(err => {
            interaction.reply("Error : " + err)
            return c.error(err, __filename)
        })
    }
}