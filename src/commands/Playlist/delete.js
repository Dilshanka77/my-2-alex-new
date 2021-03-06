const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'delete',
  aliases: ['pldelete'],
  category: 'Playlist',
  description: 'Delete your saved playlist.',
  args: false,
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
          .setDescription(`Playlist not found. Please enter the Delete playlist name`),
      ],
    });

    if (!Name) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`Playlist not found. Please enter the delete playlist name`),
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
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    await data.delete();
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Successfully deleted \`${Name}\` playlist`);
    return message.channel.send({ embeds: [embed] });
  },
};
