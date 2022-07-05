const { MessageEmbed, version } = require('discord.js');
const os = require('os');
let cpuStat = require("cpu-stat");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: 'botinfo',
  description: 'Show status bot',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  run: async ( client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    let uptime = await os.uptime();

    let d = Math.floor(uptime / (3600 * 24));
    let h = Math.floor(uptime % (3600 * 24) / 3600);
    let m = Math.floor(uptime % 3600 / 60);
    let s = Math.floor(uptime % 60);
    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    let ccount = client.channels.cache.size;
    let scount = client.guilds.cache.size;
    let mcount = 0;


    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
     // if (!Math.round(client.ws.ping) < 200){

   const embed = new MessageEmbed()
   .setDescription(`
   __**${client.user.username} Information**__\n
   \`[ ● ]\` <:816400544389922887:978998032983011348> **bot id:** \`${client.user.id}\`
   \`[ ● ]\` <:730822829322534933:978998537339699230> **bot tag:** \`${client.user.tag}\`
   \`[ ● ]\` <a:stats:952786237897469962> **bot ping:** \`${Math.round(client.ws.ping)}ms\`
   \`[ ● ]\` <a:uptimer:967721042825076776> **bot Uptime:** \`${moment.duration(interaction.client.uptime).format(" D [days] : H [hrs] : m [mins] : s [secs]")}\`
   \`[ ● ]\` <:volume:950750785115914261> **voiceConnectionsn:** \`${client.guilds.cache.filter((g) => g.me.voice.channel).size}\`
   \`[ ● ]\` <:cpu_usage:971355622698262528> **Cpu use:** \`${percent.toFixed(2)}%\`
   \`[ ● ]\` <:Windows11:967721763272294430> **os:** \`${os.platform()}\`
   \`[ ● ]\` <:cpu:967719438029824020> **Cpu:** \`${os.cpus().map((i) => `${i.model}`)[0]}\`
   \`[ ● ]\` <:RAM:967719610482823178> **Memory:** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/${( os.totalmem() / 1024 / 1024).toFixed(2)} MB\`
   \`[ ● ]\` <:guilds:951293640855146506> **servers:** \`${scount}\`
   \`[ ● ]\` <:Users:951292896630423582> **users:** \`${mcount}\` 
   \`[ ● ]\` <:877164961628041217:978997516307681300> **channel:** \`${ccount}\`
   \`[ ● ]\` <:DiscordJS:951149633780998144> **Discord.js:** \`v${version}\`
   \`[ ● ]\` <:nodejs:951149506555175024> **Node:** \` ${process.version}\`
   \`[ ● ]\` <:mongoose_db:983610714163937280>**Mongoose:** \`v6.2.3\`
   
   `)
  // .setFields([
   /// {name: "**Usefull Link**", value : `>>> [invite](https://discord.com/api/oauth2/authorize?client_id=976073875072901170&permissions=397619363193&scope=bot%20applications.commands) **|** [support](https://discord.gg/hKWE5FgxUy)`,inline: false}
   //])
 //  .setThumbnail(client.user.displayAvatarURL())
  // .addFields([
   // { name: "<:816400544389922887:978998032983011348>**bot id**", value: `\`${client.user.id}\``,inline: true },
   // { name: "<:730822829322534933:978998537339699230>**bot tag**", value: `\`${client.user.tag}\``,inline: true },
    
   // { name: "<a:stats:952786237897469962>**bot ping**", value: `\`${Math.round(client.ws.ping)}ms\``,inline: true },
   // { name: "<a:uptimer:967721042825076776>**bot Uptime**", value: `<t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>`,inline: true },
   // { name: "<:cpu_usage:971355622698262528>**Cpu use**", value: `\`${percent.toFixed(2)}%\``,inline: true },
   /// { name: "<:Windows11:967721763272294430> **os**", value: `\`${os.platform()}\``,inline: true },
   // { name: "<:cpu:967719438029824020>**Cpu**", value: `\`\`\` ${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,inline: false },
    
  //  { name: "<:RAM:967719610482823178>**Memory**", value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/\n${( os.totalmem() / 1024 / 1024).toFixed(2)} MB\``,inline: true },
  //  
  //  { name: "<:guilds:951293640855146506> **servers**", value: `\`${scount}\``,inline: true },
  //  { name: "<:Users:951292896630423582>**users**", value: `\`${mcount}\``,inline: true },
   // { name: "<:877164961628041217:978997516307681300>**channel**", value: `\`${ccount}\``,inline: true },
  
    
    
   // { name: "<:DiscordJS:951149633780998144>**Discord.js**", value: `\`v${version}\``,inline: true },
   // { name: "<:nodejs:951149506555175024>**Node**", value: `\`${process.version}\``,inline: true },
    //{ name: "<:premium:950736386548457472>**owners**", value: `<a:959449493445689444:967384385756233728>[Dilshan_Ka#4067](https://discord.gg/hKWE5FgxUy)\n <a:959449493445689444:967384385756233728>[DK.Kratos#0001](https://discord.gg/G9nCKWxTCw)\n <a:959449493445689444:967384385756233728>[!DRACO#3042](https://discord.gg/rWSdVUX2Jh)`,inline: true },
    
  
    
 // ])
  .setFooter({
    text: `Requested by :- ${interaction.user.tag}`,
    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
  })
   .setColor(client.embedColor)
   .setTimestamp(Date.now());
   return interaction.editReply({ embeds: [embed] });
//};




  });

},
};