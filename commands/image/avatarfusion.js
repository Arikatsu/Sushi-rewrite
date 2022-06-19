const { SlashCommandBuilder } = require('@discordjs/builders');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatarfusion')
        .setDescription('Fuses avatars of two server members together')
        .addUserOption(option => option.setName('user1').setDescription('First user to fuse').setRequired(true))
        .addUserOption(option => option.setName('user2').setDescription('Second user to fuse').setRequired(true)),
    async execute(interaction) {
        let user1 = interaction.options.getUser('user1')
        let user2 = interaction.options.getUser('user2')
        const baseAvatarURL = user1.displayAvatarURL({ format: 'png', size: 512 })
        const overlayAvatarURL = user2.displayAvatarURL({ format: 'png', size: 512 })
        try {
            const baseAvatarData = await request.get(baseAvatarURL);
            const baseAvatar = await loadImage(baseAvatarData.body);
            const overlayAvatarData = await request.get(overlayAvatarURL);
            const overlayAvatar = await loadImage(overlayAvatarData.body);
            const canvas = createCanvas(baseAvatar.width, baseAvatar.height);
            const ctx = canvas.getContext('2d');
            ctx.globalAlpha = 0.5;
            ctx.drawImage(baseAvatar, 0, 0);
            ctx.drawImage(overlayAvatar, 0, 0, baseAvatar.width, baseAvatar.height);
            return interaction.reply({ files: [{ attachment: canvas.toBuffer(), name: 'avatarfusion.png' }] })
        } catch (err) {
            return interaction.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}