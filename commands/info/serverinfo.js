const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require ("discord.js")
const moment = require('moment')

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
  MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	us_central: 'US Central',
	us_east: 'US East',
	us_west: 'US West',
	us_south: 'US South'
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Shows information about the server the command is being used in'),
    async execute(interaction, client) {
        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString())
        const members = interaction.guild.members.cache
        const channels = interaction.guild.channels.cache
        const emojis = interaction.guild.emojis.cache
        const owner = interaction.guild.fetchOwner()
        let embed = new MessageEmbed()
            .setTitle(`**Guild information for __${interaction.guild.name}__**`)
            .setColor('RANDOM')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '**• Owner:**', value: `${owner.tag}`},
                { name: '**• Created At**', value: `${moment(interaction.guild.createdTimestamp).format('LL')}\n${moment(interaction.guild.createdTimestamp).fromNow()}`},
                { name: '**• Roles**', value: `${roles.length}`},
                { name: '**• Emojis**', value: `${emojis.size}`},
                { name: '**• Boost Count**', value: `${interaction.guild.premiumSubscriptionCount || '0'}`},
                { name: '**• Verification Level**', value: `${verificationLevels[interaction.guild.verificationLevel]}`},
                { name: '**• Content Filter**', value: `${filterLevels[interaction.guild.explicitContentFilter]}`},
                { name: '**• Members**', value: `${interaction.guild.memberCount}`},
                { name: '**• Channels**', value: `⌨️ ${channels.filter(channel => channel.type === 'GUILD_TEXT').size}  | 🔈 ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}`},
                { name: '**• Bots**', value: `${members.filter(member => member.user.bot).size}`}
            )
            .setFooter({text: `Sushi`, iconURL: client.user.displayAvatarURL()})
        interaction.reply({embeds: [embed]})
    }
}