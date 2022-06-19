const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Shows a member\'s avatar')
        .addUserOption(option => option.setName('user').setDescription('user to get the avatar of')),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        if (user) {
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .addField(
                    "Links",
                    `[Png](${user.displayAvatarURL({
                        format: "png",
                        dynamic: true
                    })}) | [Jpg](${user.displayAvatarURL({
                        format: "jpg",
                        dynamic: true
                    })}) | [Webp](${user.displayAvatarURL({
                        format: "webp",
                        dynamic: true
                    })})`
                )
                .setImage(user.displayAvatarURL({ dynamic: true }))
            interaction.reply({embeds: [embed]})
        }
        else {
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .addField(
                    "Links",
                    `[Png](${interaction.user.displayAvatarURL({
                        format: "png",
                        dynamic: true
                    })}) | [Jpg](${interaction.user.displayAvatarURL({
                        format: "jpg",
                        dynamic: true
                    })}) | [Webp](${interaction.user.displayAvatarURL({
                        format: "webp",
                        dynamic: true
                    })})`
                )
                .setImage(interaction.user.displayAvatarURL({ dynamic: true }))
            interaction.reply({embeds: [embed]})
        }
    }
}