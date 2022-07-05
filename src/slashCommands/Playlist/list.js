const { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../../schema/playlist");
const lodash = require("lodash");
module.exports = {
  name: 'pl-list',
  description: 'To List The Playlist.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({});
    const data = await db.find({ UserId: interaction.member.user.id });

    if (!data.length) {
      return interaction.editReply({
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
  
    let list = data.map(
      (x, i) => `\`[ ${++i} ]\` - ${x.PlaylistName} \`${x.Playlist.length}\` - <t:${x.CreatedOn}>`,
    );
    const pages = lodash.chunk(list, 10).map((x) => x.join('\n'));
    let page = 0;
    let List = list.length;

    const embeds = new MessageEmbed()
      .setAuthor({
        name: `${interaction.user.username}'s Playlists`,
        iconURI: interaction.user.displayAvatarURL(),
      })
      .setDescription(pages[page])
      .setFooter({ text: ` Playlist (${List} / 10)`})
      .setColor(client.embedColor);
    return await interaction.editReply({ embeds: [embeds] });
  },
};
