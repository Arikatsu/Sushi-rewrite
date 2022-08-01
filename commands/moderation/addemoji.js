const { SlashCommandBuilder } = require("@discordjs/builders");
const { Util, Permissions } = require("discord.js");
const Logger = require('../../utils/logger')
const c = new Logger()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_EMOJIS)
        .setName('addemojis')
        .setDescription('Adds an emoji to the server')
        .addStringOption(option => option.setName('emojis').setDescription('emojis to add').setRequired(true)),
    async execute(interaction) {
        if (interaction.guild.me.Permissions.has(Permissions.FLAGS.MANAGE_EMOJIS)) return interaction.reply("I don't have the `Manage Emojis` permission!");
        let emojis = interaction.options.getString('emojis').match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return interaction.reply(`:x: | **Provde The emojis to add**`);
        interaction.reply('adding emojis...');
        emojis.forEach(emote => {
            let emoji = Util.parseEmoji(emote);
            if (interaction.guild.emojis.cache.find(check => check.name === emoji.name)) 
            return interaction.channel.send(`:x: | **${emoji.name} already exists**`);
            if (emoji.id) {
                const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
                interaction.guild.emojis.create(`${Link}`, `${`${emoji.name}`}`).then(em => interaction.channel.send(em.toString() + " added!")).catch(error => {
                    interaction.reply(":x: | an Error occured")
                    c.error(error, __filename)
                })
            }
        })
    }
}