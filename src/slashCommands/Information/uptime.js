const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: 'uptime',
  description: 'return websocket ping',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    var support = client.config.links.support;
    var color = client.embedColor;
    
    //const embed = new MessageEmbed()
  //  .setDescription(`**Uptime Info**\n \`\`\`
//• Uptime :: ${moment.duration(interaction.client.uptime).format(" D [days] : H [hrs] : m [mins] : s [secs]")}
//\`\`\`\n `)
 //.setColor(client.embedColor);
    await interaction.editReply(`** Uptime** - \`${moment.duration(interaction.client.uptime).format(" D [days] : H [hrs] : m [mins] : s [secs]")}\``);
  },
};
