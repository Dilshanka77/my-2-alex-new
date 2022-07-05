const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Check Ping Bot",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    //await message.reply({ content: "**Pining..**" }).then(async (msg) => {
      //var ping = msg.createdAt - message.createdAt;
      //var api_ping = client.ws.ping;


        //var ping = msg.createdAt - message.createdAt;
        var api_ping = client.ws.ping;
       // var average_ping = (Math.round((ping + api_ping) / 2).toFixed(0))

        //if (ping <= 500 ) emoji_ping = "<:webonline:983606157346242580>";
       // if (ping > 500 && ping <= 1000) emoji_ping = "<:webidle:983606946693279754>";
       // if (ping > 1000) emoji_ping = "<:webdnd:983606995661758494>";

        if (api_ping <= 100 ) emoji_api_ping = "<:webonline:983606157346242580>";
        if (api_ping > 100 && api_ping <= 250) emoji_api_ping = "<:webidle:983606946693279754>";
        if (api_ping > 250) emoji_api_ping = "<:webdnd:983606995661758494>";

        //if (average_ping <= 300 ) emoji_average_ping = "<:webonline:983606157346242580>";
      //  if (average_ping > 300 && average_ping <= 625) emoji_average_ping = "<:webidle:983606946693279754>";
      //  if (average_ping > 625) emoji_average_ping = "<:webdnd:983606995661758494>";

    //  let PingEmbeda = new MessageEmbed()
      //.setColor(client.embedColor)
      //  .setDescription(`Bot ping : ${api_ping}ms [ ${emoji_api_ping} ]`)
       // .setFooter({ text: `Alexia`, iconURL: `https://cdn.discordapp.com/avatars/976073875072901170/3f6da8bf7b5c731424a7361f4ea63692.png?size=4096&ignore=true)`})
       message.reply(`**Bot ping** - \`${api_ping}ms\` \`[\` ${emoji_api_ping} \`]\` `)
      //await msg.edit(`**Bot Latency** - \`${ping}ms\`\n**API Latency** - \`${api_ping}ms\``)

       //msg.edit(`**Bot Latency** - \`${ping1}ms\`\n**API Latency** - \`${api_ping}ms\` `)
       //msg.edit(`**Bot ping** - \`${ping}ms\` `)
        
      
    


    


    //}
    //)
  }
}
