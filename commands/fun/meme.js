const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Sends a random meme'),
    async execute(interaction) {
        const reds = [
            "memes",
            "me_irl",
            "dankmemes",
            "comedyheaven",
            "Animemes"
        ];
        const rads = reds[Math.floor(Math.random() * reds.length)];
        const res = await fetch(`https://www.reddit.com/r/${rads}/random/.json`)
        const json = await res.json()
        if (!json[0]) return interaction.reply(`Your Life Lmfao`)
        const data = json[0].data.children[0].data
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setURL(`https://reddit.com${data.permalink}`)
            .setTitle(data.title)
            .setDescription(`Author : ${data.author}`)
            .setImage(data.url)
            .setFooter({text: `${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`})
        await interaction.reply({embeds: [embed]})
    }
}