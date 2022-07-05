const { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../../schema/playlist");
const { convertTime } = require("../../utils/convert.js");
const lodash = require("lodash");

module.exports = {
  name: 'pl-info',
  description: 'Get information about your saved playlist.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  options: [
    {
      name: 'name',
      description: 'Playlist Name',
      required: true,
      type: 'STRING',
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({});

    const Name = interaction.options.getString('name');
    const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });

    if (!data) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You don't have a playlist with **${Name}** name`)
          
        ],
      });
    } 
    let pname = data.PlaylistName;
    let plist = data.Playlist.length;
    let tracks = data.Playlist.map(
      (x, i) =>
        `\`[ ${1+i} ]\` - ${x.title && x.uri ? `[${x.title}](${x.uri})` : `${x.title}`}${
          x.duration ? ` - \`[ ${convertTime(Number(x.duration))} ]\`` : ''
        }`,
    );
    const pages = lodash.chunk(tracks, 10).map((x) => x.join('\n'));
    let page = 0;

    const embed = new MessageEmbed()
      .setTitle(`${interaction.user.username} Playlist information`)
      .setColor(client.embedColor)
      .setDescription(`<:playlists:989525600962220053> Playlist Name - \`${pname}\` \n<:Playlist:989525525557051402> Total Tracks - \`${plist}\`\n\n${pages[page]}`)
      .setFooter({
        text: `${interaction.user.username} | ${page + 1}/${pages.length}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
    if (pages.length <= 1) {
      return await interaction.editReply({ embeds: [embed] });
    } else {
      let previousbut = new MessageButton()
        .setCustomId('Previous')
        .setLabel('Previous')
        .setStyle('SECONDARY');

      let nextbut = new MessageButton().setCustomId('Next').setLabel('Next').setStyle('SECONDARY');

      let stopbut = new MessageButton().setCustomId('Stop').setLabel('Stop').setStyle('SECONDARY');

      const row = new MessageActionRow().addComponents(previousbut, stopbut, nextbut);

      await interaction.editReply({ embeds: [embed], components: [row] });

      const collector = interaction.channel.createMessageComponentCollector({
        filter: (b) =>
          b.user.id === interaction.member.user.id
            ? true
            : false && b.deferUpdate().catch(() => {}),
        time: 60000 * 5,
        idle: (60000 * 5) / 2,
      });

      collector.on('end', async () => {
        await interaction.editReply({
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

          embed.setDescription(
            `<:playlists:989525600962220053> Playlist Name - \`${pname}\` \n<:Playlist:989525525557051402> Total Tracks - \`${plist}\`\n\n${pages[page]}`,
          )
            .setFooter({
        text: `${interaction.user.username} | ${page + 1}/${pages.length}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

          return await interaction.editReply({ embeds: [embed] });
        } else if (b.customId === 'Stop') {
          return collector.stop();
        } else if (b.customId === 'Next')
          page = page + 1 >= pages.length ? 0 : ++page;

        embed.setDescription(
          `<:playlists:989525600962220053> Playlist Name - \`${pname}\` \n<:Playlist:989525525557051402> Total Tracks - \`${plist}\`\n\n${pages[page]}`,
        )
          .setFooter({
        text: `${interaction.user.username} | ${page + 1}/${pages.length}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

        return await interaction.editReply({ embeds: [embed] });
      });
    }
  },
};

