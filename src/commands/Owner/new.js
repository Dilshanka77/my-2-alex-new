const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'dil',
  category: 'Owner',
  aliases: [],
  description: 'Gives you the link of our sponsor',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: true,
  execute: async (message, args, client, prefix) => {
    var support = client.config.links.support;

    let send = args.slice(0).join(" ");
      
     message.channel.send(send);
     message.delete();
    
  },
};
