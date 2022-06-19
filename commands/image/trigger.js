const { SlashCommandBuilder } = require("@discordjs/builders")
const canvacord = require("canvacord")
const { MessageAttachment } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trigger')
        .setDescription('Trigger yourself or another server member')
        .addUserOption(option => option.setName('user').setDescription('user to trigger')),
    async execute(interaction) {
        let user = interaction.options.getUser('user')
        if (user) {
            let facepalm = await canvacord.Canvas.trigger(user.displayAvatarURL({ format: "png", dynamic: true }));
            let attachment = new MessageAttachment(facepalm, "triggered.gif");
            return interaction.reply({ files: [attachment] });
        }
        else {
            let facepalm = await canvacord.Canvas.trigger(interaction.user.displayAvatarURL({ format: "png", dynamic: true }));
            let attachment = new MessageAttachment(facepalm, "triggered.gif");
            return interaction.reply({ files: [attachment] });
        }
    }
}