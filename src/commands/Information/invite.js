const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'invite',
  category: 'Information',
  aliases: ['addme'],
  description: 'invite WaveMusic',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
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
     // .setFooter({ text: 'Alexia', iconURL: 'https://cdn.discordapp.com/avatars/976073875072901170/3f6da8bf7b5c731424a7361f4ea63692.png?size=4096&ignore=true)'});
    message.reply({ embeds: [mainPage], components: [row] });
  },
};
