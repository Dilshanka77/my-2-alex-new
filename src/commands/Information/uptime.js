const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "uptime",
    category: "Information",
    aliases: [ "up" ],
    description: "Uptime Of The Bot",
    args: false,
    usage: "",
    permission: ["SEND_MESSAGES"],
    owner: false,
   // count: true,
    execute: async (message, args, client, prefix) => {
       //const duration1 = moment.duration(message.client.uptime).format(" D [days] : H [hrs] : m [mins] : s [secs]");
        
       // const embed = new MessageEmbed()
          
            //.setColor('#acace6')
            
            //.setDescription(`**Uptime Info**\n \`\`\`
//• Uptime :: ${moment.duration(message.client.uptime).format(" D [days] : H [hrs] : m [mins] : s [secs]")}
//\`\`\`\n ${client.update}`);

        // message.reply({embeds: [embed]});
        message.reply(`**Uptime** - \`${moment.duration(message.client.uptime).format(" D [days] : H [hrs] : m [mins] : s [secs]")}\``)
    }
}