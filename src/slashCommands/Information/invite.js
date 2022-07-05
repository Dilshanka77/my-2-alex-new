const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
  name: "invite",
  description: "Get The Bot Invite Link",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });

    var invite = client.config.links.invite;
    var color = client.embedColor
    var invite = client.config.links.invite;
    var support = client.config.links.support;
    
    const but1 =  new MessageButton().setLabel('Invite').setStyle('LINK').setURL(invite).setEmoji(`<:gh_invite:992391216333328445>`)
    const but2 =  new MessageButton().setLabel('support').setStyle('LINK').setURL(support).setEmoji(`<:Support:992391304594067507>`)
      const row = new MessageActionRow().addComponents(but1,
        but2
        );
    const mainPage = new MessageEmbed()
    .setTitle('Invite info')
      .setDescription(`<:gh_invite:992391216333328445>Admin Invite\n [Click here to Invite](${invite})\n <:gh_invite:992391216333328445>Normal Invite\n[Click here to Invite](${invite})\n <:Support:992391304594067507>Support Server\n [Click here to support](${support})`)
      .setColor(client.embedColor)
    interaction.editReply({ embeds: [mainPage], components: [row] })
  }
}