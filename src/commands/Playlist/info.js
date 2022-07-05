const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const db = require('../../schema/playlist');
const { convertTime } = require('../../utils/convert.js');
const lodash = require('lodash');

module.exports = {
  name: 'info',
  aliases: ['plinfo'],
  category: 'Playlist',
  description: 'Get information about your saved playlist.',
  args: true,
  usage: '<playlist name>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {


    const Name = args[0];
    //let Name = args.slice(0).join(" ");

    if (!Name) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`Playlist not found. Please enter the correct playlist name`),
      ],
    });

    
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    let tracks = data.Playlist.map(
      (x, i) =>
        `\`[ ${1+i} ]\` - ${x.title && x.uri ? `[${x.title}](${x.uri})` : `${x.title}`}${
          x.duration ? ` - \`[ ${convertTime(Number(x.duration))} ]\`` : 'not music'
        }`,
    );
    let pname = data.PlaylistName;
    let plist = data.Playlist.length;

    const pages = lodash.chunk(tracks, 10).map((x) => x.join('\n'));
    let page = 0;
    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Playlist information`)
      .setColor(client.embedColor)
      .setFooter({text: `${message.author.username} | ${page + 1}/${pages.length}`,
      iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(`<:playlists:989525600962220053> Playlist Name - \`${pname}\` \n<:Playlist:989525525557051402> Total Tracks - \`${plist}\`\n\n${pages[page]}`);
    if (pages.length <= 1) {
      return await message.reply({ embeds: [embed] });
    } else {
      let previousbut = new MessageButton()
        .setCustomId('Previous')
        .setLabel('Previous')
        .setStyle('SECONDARY');

      let nextbut = new MessageButton().setCustomId('Next').setLabel('Next').setStyle('SECONDARY');

      let stopbut = new MessageButton().setCustomId('Stop').setLabel('Stop').setStyle('SECONDARY');

      const row = new MessageActionRow().addComponents(previousbut, stopbut, nextbut);

      const m = await message.reply({ embeds: [embed], components: [row] });

      const collector = m.createMessageComponentCollector({
        filter: (b) =>
          b.user.id === message.author.id ? true : false && b.deferUpdate().catch(() => {}),
        time: 60000 * 5,
        idle: (60000 * 5) / 2,
      });

      collector.on('end', async () => {
        if (!m) return;
        await m.edit({
          components: [
            new MessageActionRow().addComponents(
              previousbut.setDisabled(true),
              stopbut.setDisabled(true),
              nextbut.setDisabled(true),
            ),
          ],
        });
      });

      collector.on('collect', async (b) => {
        if (!b.deferred) await b.deferUpdate().catch(() => {});
        if (b.customId === 'Previous') {
          page = page - 1 < 0 ? pages.length - 1 : --page;
          if (!m) return;

          embed.setDescription(
            `<:playlists:989525600962220053> Playlist Name - \`${pname}\` \n<:Playlist:989525525557051402> Total Tracks - \`${plist}\`\n\n${pages[page]}`,
          )
            .setFooter({text: `${message.author.username} | ${page + 1}/${pages.length}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });

          return await m.edit({ embeds: [embed] });
        } else if (b.customId === 'Stop') {
          
          return collector.stop();
        } else if (b.customId === 'Next')
          page = page + 1 >= pages.length ? 0 : ++page;
        if (!m) return;

        embed.setDescription(
          `<:playlists:989525600962220053> Playlist Name - \`${pname}\` \n<:Playlist:989525525557051402> Total Tracks - \`${plist}\`\n\n${pages[page]}`,
        )
          .setFooter({
        text: `${message.author.username} | ${page + 1}/${pages.length}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });

        return await m.edit({ embeds: [embed] });
      });
    }
  },
};
