const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
  name: 'sponsor',
  description: 'sponsor info',
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
    const row = new MessageActionRow().addComponents(
      new MessageButton().setLabel('Creactive web').setStyle('LINK').setURL('https://auto.creavite.co/').setEmoji('<:creative:983624593610772500>'),
      new MessageButton().setLabel('Creactive Discord').setStyle('LINK').setURL('https://discord.gg/jnY5kNCwh7').setEmoji('<:discord:989550345946562601> ')
    );
    const embed = new MessageEmbed()
      .setDescription(`[Creactive.co](https://auto.creavite.co/) is the best solution to create Discord server banners,server icons,user avatars and many many more.You can test it by clicking on follow Sponsor Button and in the same way you can join their [Discord Support](https://discord.gg/jnY5kNCwh7) Server.`)
      .setImage(`https://api.creavite.co/marketing/banner.gif`)
      .setColor(color);
      
    await interaction.editReply({ embeds: [embed], components: [row] });
  },
};
