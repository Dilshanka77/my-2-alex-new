const { MessageEmbed } = require('discord.js');
const Wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'stop',
  category: 'Music',
  description: 'Stops the music',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('not playing Music plss play mysic and use the command');
      return message.reply({ embeds: [thing] });
    }
    player.queue.length = 0;
    player.repeat = 'off';
    player.data.delete("autoplay")
    player.stopped = true;
    await player.player.stopTrack();
    if (!player.queue[0])
    var size = player.queue[0];
        player.queue = [];
    Wait(500);
    const emojistop = client.emoji.stop;
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojistop} music Stoped`);
    message.reply({ embeds: [thing] });
  },
};
