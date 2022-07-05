const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'loop',
  aliases: ['l'],
  category: 'Music',
  description: 'music loop \`<queue|track|off>\`',
  args: true,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {


    const Name = args[0];

    if (!Name) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`loop not found. Please enter the {\`queue or track or off\`}`),
      ],
    });
    const player = client.manager.players.get(message.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('not playing Music plss play mysic and use the command');
      return message.reply({ embeds: [thing] });
    }
    const emojiloop = client.emoji.loop;

    if (['q', 'queue'].includes(args[0])) {
      await player.setLoop('queue');
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} Loop queue is now **enable**`);
      return message.reply({ embeds: [thing] });
    } else if (['track', 't'].includes(args[0])) {
      await player.setLoop('track');

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} Loop track is now **enable**`);
      return message.reply({ embeds: [thing] });
    } else if (['off', 'c', 'clear'].includes(args[0])) {
      await player.setLoop('off');

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} Loop is now **disabled**`);
      return message.reply({ embeds: [thing] });
    }
  },
};
