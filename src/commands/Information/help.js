const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton  } = require('discord.js');

const os = require('os');
let cpuStat = require("cpu-stat");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['h'],
  description: 'Return all commands, or one specific command',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var invite = client.config.links.invite;
    var support = client.config.links.support;
    var vote = client.config.links.vote;
    var web = client.config.links.web;

    

    
    let ccount = client.channels.cache.size;
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
    
    const embed = new MessageEmbed()
      .setTitle(`__${client.user.username} Help Menu__`)
      .setDescription(
        `**Information about** \n>>> An advanced Music System with Audio Filtering..custom playlist.spotify,youtube,soundcloud and more.... 
        \n \n`,
      )
      .setFields([
        {name: "<:commands:951354075373502554>**My Commands Menu.**", value: `>>> <:Catagory:951354561292021760> Command Categories \n<:937584994849812491:979000610391195649>\`〢\` Music\n<:969043735247716392:979001284034187264>\`〢\` Playlist\n<:937063387236552714:945984613334011935>\`〢\` information\n<:settings:950996345177649182>\`〢\` Settings\n<:filter:951353017695871007>\`〢\` Filter`,inline: false},
        {name: "<:stats:951294365651849287>**BOT STATS**", value: `>>> <:guilds:951293640855146506>**Servers:** \`${scount}\`\n<:877164961628041217:978997516307681300>**Channels:** \`${ccount}\`\n<:user:991954430922608650>**Users:** \`${mcount}\`\n<a:Duration:978687081540911195>**Uptime:** \`${moment.duration(message.client.uptime).format(" D [days] : H [hrs] : m [mins] : s [secs]")}\`\n<:ping:951022446566326323> **ping:** \`${Math.round(client.ws.ping)}ms\` `,inline: false},
       // {name: "**Usefull Link**", value : `>>> [sponsor](https://auto.creavite.co/) **|** [invite](https://discord.com/api/oauth2/authorize?client_id=976073875072901170&permissions=397619363193&scope=bot%20applications.commands) **|** [support](https://discord.gg/hKWE5FgxUy)`,inline: false}
      ])
      
        
      
      .setThumbnail(client.user.displayAvatarURL())
      .setImage('https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif')
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });

    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('helpop')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('Alexia Music Help')
          .addOptions([
            {
              label: 'Home',
              value: 'home',
              emoji: '<:housee:951143177430114334>',
              description: 'Go to Home pege'
            },
            {
              label: 'Music',
              value: 'music',
              emoji: '<:937584994849812491:979000610391195649>',
              description: 'music commands'
            },
            {
              label: ' Filter',
              value: 'filter',
              emoji: '<:filter:951353017695871007>',
              description: 'filter commands'
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '<:937063387236552714:945984613334011935>',
              description: 'information commands'
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '<:settings:950996345177649182>',
              description: 'setting commands'
            },
            {
              label: 'custom playlist',
              value: 'playlist',
              emoji: '<:969043735247716392:979001284034187264>',
              description: 'playlist commands'
            },
            
          ])
      )
      const row1 = new MessageActionRow().addComponents(
        new MessageButton().setLabel('invite').setStyle('LINK').setURL(invite),
        new MessageButton().setLabel('support').setStyle('LINK').setURL(support),
        new MessageButton().setLabel('vote').setStyle('LINK').setURL(vote),
        new MessageButton().setLabel('website').setStyle('LINK').setURL(web),
        new MessageButton().setLabel('sponsor').setStyle('LINK').setURL('https://auto.creavite.co/').setEmoji('<:creative:983624593610772500>'),
    );

    const m = await message.reply({ embeds: [embed], components: [row,row1] })

    const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('disable_h')
          .setDisabled(true)
          .setPlaceholder(`Timeout do ${prefix}help`)
          .addOptions([
            {
              label: 'Home',
              value: 'home',
              emoji: '<:housee:951143177430114334>',
              description: 'Go to Home pege'
            },
            {
              label: 'Music',
              value: 'music',
              emoji: '<:937584994849812491:979000610391195649>',
              description: 'music commands'
            },
            {
              label: ' Filter',
              value: 'filter',
              emoji: '<:filter:951353017695871007>',
              description: 'filter commands'
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '<:937063387236552714:945984613334011935>',
              description: 'information commands'
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '<:settings:950996345177649182>',
              description: 'setting commands'
            },
            {
              label: 'custom playlist',
              value: 'playlist',
              emoji: '<:969043735247716392:979001284034187264>',
              description: 'playlist commands'
            },
            
          ])
      )
      const row3 = new MessageActionRow().addComponents(
        new MessageButton().setLabel('invite').setStyle('LINK').setURL(invite),
        new MessageButton().setLabel('support').setStyle('LINK').setURL(support),
        new MessageButton().setLabel('vote').setStyle('LINK').setURL(vote),
        new MessageButton().setLabel('website').setStyle('LINK').setURL(web),
        new MessageButton().setLabel('sponsor').setStyle('LINK').setURL('https://auto.creavite.co/').setEmoji('<:creative:983624593610772500>'),
    );


    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: "SELECT_MENU",
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2,row3] }).catch(() => { });
    });

    collector.on("collect", (interaction) => {
      if (!interaction.deferred) interaction.deferUpdate();
      const options = interaction.values[0];
      let _commands;

      if (options === 'music') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Music')
          .map((x) => `\`${x.name}\` \n<:nreply:991953252331556944>_${x.description}_`);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join('\n '))
          .setImage('https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif')
          .setTitle('<:937584994849812491:979000610391195649>Music Commands')
          .setFooter({ text: `Total ${_commands.length} Music commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'filter') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Filters')
          .map((x) => `\`${x.name}\`\n<:nreply:991953252331556944>_${x.description}_`);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join('\n '))
          .setImage('https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif')
          .setTitle('<:filter:951353017695871007>Filter Commands')
          .setFooter({ text: `Total ${_commands.length} Filter commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'playlist') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Playlist')
          .map((x) => `\`${x.name}\` \n<:nreply:991953252331556944>_${x.description}_`);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join('\n '))
          .setImage('https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif')
          .setTitle('<:969043735247716392:979001284034187264>custom playlist Commands')
          .setFooter({ text: `Total ${_commands.length} Playlist commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'settings') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Settings')
          .map((x) => `\`${x.name}\` \n<:nreply:991953252331556944>_${x.description}_`);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join('\n '))
          .setImage('https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif')
          .setTitle('<:settings:950996345177649182>Settings Commands')
          .setFooter({ text: `Total ${_commands.length} Settings commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'info') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Information')
          .map((x) => `\`${x.name}\` \n<:nreply:991953252331556944>_${x.description}_`);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join('\n '))
          .setImage('https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif')
          .setTitle('<:937063387236552714:945984613334011935>Information Commands')
          .setFooter({ text: `Total ${_commands.length} Information commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }

      if (options === 'home') {
        if (!m) return;
        return m.edit({
          embeds: [embed],
          components: [row],
        });
      }
    }
    )

  },
};