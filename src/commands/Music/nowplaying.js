const { MessageEmbed } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  category: 'Music',
  description: 'Show now playing song',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    const song = player.current;
    if (!player.current) {
      let embed = new MessageEmbed()
          .setColor('RED')
          .setDescription('not playing Music plss play mysic and use the command');
      return message.channel.send({ embeds: [embed] });
    }

    const emojimusic = client.emoji.music;
    var total = song.length;
    var current = player.player.position;

    let embed = new MessageEmbed()
      .addField(`${emojimusic} **Now Playing**`, `[${song.title}](${song.uri})`)
      .addFields([
        {
          name: 'Duration',
          value: `\`[ ${convertTime(total)} ]\``,
          inline: true,
        },
        {
          name: 'Author',
          value: `\`${player.current.author}\``,
          inline: true,
        },
        {
          name: 'Requested by',
          value: `\`${song.requester.tag}\` `,
          inline: true,
        },
        {
            name: `**Progress Bar - **\`${(progressbar(current, total, 15).percentageText)}\` played`,
            value: `${(progressbar(current, total, 15).Bar)}\n \`${convertTime(current)}  ${convertTime(total,)}\``,
            inline: false,
        },
      ])

      .setThumbnail(
        `${
          player.current.thumbnail
            ? player.current.thumbnail
            : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`
        }`,
      )
      .setColor(client.embedColor);
      //.setFooter({ text: 'Alexia', iconURL: 'https://cdn.discordapp.com/avatars/976073875072901170/3f6da8bf7b5c731424a7361f4ea63692.png?size=4096&ignore=true)'});
    return message.channel.send({ embeds: [embed] });
  },
};