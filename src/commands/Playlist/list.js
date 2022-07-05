const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const db = require("../../schema/playlist");
const lodash = require("lodash");

module.exports = {
  name: 'list',
  aliases: ['pllist'],
  category: 'Playlist',
  description: 'To List The Playlist.',
  args: false,
  usage: 'list',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
//   const memberid =  ;



    let data = await db.find({ UserId: message.member.user.id});
    if (!data.length) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You Do Not Have Any Playlist`)
          .setFooter({
        text: `Alexia`,
        iconURL: `https://cdn.discordapp.com/avatars/976073875072901170/3f6da8bf7b5c731424a7361f4ea63692.webp`,
      }),
        ],
      });
    }
    if (!args[0]) {
      let list = data.map(
        (x, i) => `\`[ ${++i} ]\` - ${x.PlaylistName} \`${x.Playlist.length}\` - <t:${x.CreatedOn}>`,
      );
      const pages = lodash.chunk(list, 10).map((x) => x.join('\n'));
      let page = 0;
      let List = list.length;

      const embeds = new MessageEmbed()
        .setAuthor({
          name: `${message.author.username}'s Playlists`,
          iconURI: message.author.displayAvatarURL(),
        })
        .setDescription(pages[page])
        .setFooter({ text: `Playlist (${List} / 10)` })
        .setColor(client.embedColor);
      return await message.reply({ embeds: [embeds] });
    }
  },
};