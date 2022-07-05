const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const db = require("../../schema/setup");
const db2 = require("../../schema/autoReconnect");
const { autoplay } = require("../../utils/functions");

module.exports = {
  name: 'playerEmpty',
  run: async (client, player) => {
    var invite = client.config.links.invite;
    var support = client.config.links.support;
    var vote = client.config.links.vote;
    var web = client.config.links.web;
    if (player.data.get("autoplay")) {
      player.previous = player.data.get("autoplaySystem");
      return autoplay(player);
    }
    let guild = client.guilds.cache.get(player.guild);
    if (!guild) return;
    const data = await db.findOne({ Guild: guild.id });
    if (!data) return;
    let channel = guild.channels.cache.get(data.Channel);
    if (!channel) return;

    let message;

    try {

      message = await channel.messages.fetch(data.Message, { cache: true });

    } catch (e) { };

    if (!message) return;
    const but1 = new MessageButton().setCustomId(`1pause3`).setLabel(`pause & resumed`).setEmoji(`<:Previous4:992417244640444476>`).setStyle('SECONDARY').setDisabled(true)
            const but2 = new MessageButton().setCustomId(`1previous`).setLabel(`previous`).setEmoji(`${client.emoji.previous}`).setStyle('SECONDARY').setDisabled(true)
            const but3 = new MessageButton().setCustomId(`1skip`).setLabel(`skip`).setEmoji(`${client.emoji.skip}`).setStyle('SECONDARY').setDisabled(true)
            const but4 = new MessageButton().setCustomId(`1voldown`).setLabel(`voldown`).setEmoji(`${client.emoji.volumelow}`).setStyle('SECONDARY').setDisabled(true)
            const but5 = new MessageButton().setCustomId(`1volup`).setLabel(`volup`).setEmoji(`${client.emoji.volumehigh}`).setStyle('SECONDARY').setDisabled(true)
            const but6 = new MessageButton().setCustomId(`1stop`).setLabel(`stop`).setEmoji(`${client.emoji.stop}`).setStyle('SECONDARY').setDisabled(true)
            const but7 = new MessageButton().setCustomId(`1autoplay`).setLabel(`autoplay`).setEmoji(`${client.emoji.autoplay}`).setStyle('SECONDARY').setDisabled(true)
			const but8 = new MessageButton().setCustomId(`+10se`).setLabel(`+10 se`).setEmoji(`<:forward:993173755922763840>`).setStyle('SECONDARY').setDisabled(true)
			const but9 = new MessageButton().setCustomId(`loop`).setLabel(`loop`).setEmoji(`${client.emoji.loop}`).setStyle('SECONDARY').setDisabled(true)
			const but10 = new MessageButton().setCustomId(`-10se`).setLabel(`-10se`).setEmoji(`<:rewind:992425662931533915>`).setStyle('SECONDARY').setDisabled(true)

			const row1 = new MessageActionRow().addComponents(but4, but2, but1, but3, but5)
			const row2 = new MessageActionRow().addComponents(but6,but7,but8,but9,but10)

    await message.edit({ embeds: [new MessageEmbed().setColor(client.embedColor).setTitle(`Nothing playing right now in this server!`).setDescription(`**Join a Voice Channel and Type Song Link/Name to Play**\n>>> \`Support Youtube , Spotify , Soundclound and More\`\n[Invite](${client.config.links.invite}) - [Support Server](${client.config.links.support}) - [vote](${client.config.links.vote})`).setImage(client.config.links.bg)] }).catch(() => { });
    if (player.data.get('message') && !player.data.get('message').deleted) player.data.get('message').edit({ components:  [row1, row2]}).catch(() => {});
    const TwoFourSeven = await db2.findOne({ Guild: player.guild })
     const but11 = new MessageButton().setLabel(`invite`).setStyle('LINK').setURL(invite)
      const but22 = new MessageButton().setLabel(`support`).setStyle('LINK').setURL(support)
      const but33 = new MessageButton().setLabel(`vote`).setStyle('LINK').setURL(vote)
      const but44 = new MessageButton().setLabel(`website`).setStyle('LINK').setURL(web)
      
      
    
      
  
      const row111 = new MessageActionRow().addComponents(but44, but22, but11, but33)

    if (TwoFourSeven) {
     
      return client.channels.cache.get(player.text)?.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Queue ended. 24/7 is enable i am not Leaving the voice channel.')
            .setTimestamp(),
        ],
        components: [row111]
      })
      //.then(msg => { setTimeout(() => { msg.delete() }, 20000) });
    } else if (!TwoFourSeven){
    
    const but1 = new MessageButton().setLabel(`invite`).setStyle('LINK').setURL(invite)
    const but2 = new MessageButton().setLabel(`support`).setStyle('LINK').setURL(support)
    const but3 = new MessageButton().setLabel(`vote`).setStyle('LINK').setURL(vote)
    const but4 = new MessageButton().setLabel(`website`).setStyle('LINK').setURL(web)
    
    
      
  
      const row1 = new MessageActionRow().addComponents(but4, but2, but1, but3)
      client.channels.cache.get(player.text)?.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Queue ended. 24/7 is disable i am Leaving the voice channel.')
            .setTimestamp(),
        ],components: [row1]
      })
      //.then(msg => { setTimeout(() => { msg.delete() }, 20000) });
    player.destroy()
    }
  },
};
