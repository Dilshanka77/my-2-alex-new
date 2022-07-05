const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'ping',
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
   //await message.reply({ content: "**Pining..**" }).then(async (msg) => {
      //var ping = msg.createdAt - message.createdAt;
      //var api_ping = client.ws.ping;


        //var ping = msg.createdAt - message.createdAt;
        var api_ping = client.ws.ping;
       // var average_ping = (Math.round((ping + api_ping) / 2).toFixed(0))

        //if (ping <= 500 ) emoji_ping = "<:webonline:983606157346242580>";
       // if (ping > 500 && ping <= 1000) emoji_ping = "<:webidle:983606946693279754>";
       // if (ping > 1000) emoji_ping = "<:webdnd:983606995661758494>";

        if (api_ping <= 50 ) emoji_api_ping = "<:webonline:983606157346242580>";
        if (api_ping > 100 && api_ping <= 200) emoji_api_ping = "<:webidle:983606946693279754>";
        if (api_ping > 200) emoji_api_ping = "<:webdnd:983606995661758494>";

   // let PingEmbeda = new MessageEmbed()
      //  .setColor(client.embedColor)
      //.setDescription(`Bot Ping - ${api_ping}ms [ ${emoji_api_ping } ]`)
      
      await interaction.editReply(`**Bot ping** - \`${api_ping}ms\` \`[\` ${emoji_api_ping} \`]\` `);
     // await msg.edit(`**Bot Latency** - \`${ping}ms\`\n**API Latency** - \`${api_ping}ms\``)

     //interaction.editReply(`**Bot Latency** - \`${ping}ms\`\n**API Latency** - \`${api_ping}ms\``)
      
     
   // });
  },
};
