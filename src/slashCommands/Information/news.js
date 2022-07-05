const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
  name: 'news',
  description: 'return support',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    var support = client.config.links.support;
    var color = client.embedColor;
    const embed = new MessageEmbed()
    .setDescription(`fix bug`)
    .setImage(`https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif`)
    .setColor(client.embedColor);
    const embed1 = new MessageEmbed()
    .setDescription(`fix bug`)
    .setImage(`https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif`)
    .setColor(client.embedColor);
  return interaction.editReply({ embeds: [embed,embed1,embed] })
              .catch(() => { });
  },
};
