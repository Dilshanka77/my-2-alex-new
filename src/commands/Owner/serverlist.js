const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const load = require('lodash');
const Discord = require("discord.js");

module.exports = {
  name: 'serverlist',
  category: 'Owner',
  description: 'Listing Of Servers',
  aliases: ['sl'],
  args: false,
  usage: '<string>',
  permission: [],
  owner: true,
  execute: async (message, args, client, prefix) => {
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
    const serverlist = client.guilds.cache.map(
      (guild, i) => `\` • \` | ${guild.name} | id\`[ ${guild.id} ]\` | Members\`[${guild.memberCount}]\``,
    );
    const mapping = load.chunk(serverlist, 10);
    const pages = mapping.map((s) => s.join('\n'));
    let page = 0;

    const embed2 = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`<:guilds:951293640855146506>All Server:- \`${scount}\`\n<:user:991954430922608650> All user:- \`${mcount}\`\n ${pages[page]}`)

      .setFooter({
        text: `serverlist | Page ${page + 1}/${pages.length}`,
        //iconURL: `https://cdn.discordapp.com/avatars/976073875072901170/3f6da8bf7b5c731424a7361f4ea63692.png?size=4096&ignore=true)`,
      })
      .setTitle(`${message.client.user.username} serverlist info`);

    const but1 = new MessageButton()
      .setCustomId('queue_cmd_but_1')
      //.setEmoji('⏭️')
      .setLabel('Next')
      .setStyle('SECONDARY');

    const but2 = new MessageButton()
      .setCustomId('queue_cmd_but_2')
      .setLabel('Previous')
      .setStyle('SECONDARY');

    const but3 = new MessageButton()
      .setCustomId('queue_cmd_but_3')
      .setLabel('Stop')
      .setStyle('SECONDARY');

    const row1 = new MessageActionRow().addComponents([but2, but3, but1]);

    const msg = await message.channel.send({
      embeds: [embed2],
      components: [row1],
    });

    const collector = message.channel.createMessageComponentCollector({
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
      time: 60000 * 5,
      idle: 30e3,
    });

    collector.on('collect', async (button) => {
      if (button.customId === 'queue_cmd_but_1') {
        await button.deferUpdate().catch(() => {});
        page = page + 1 < pages.length ? ++page : 0;

        const embed3 = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`<:guilds:951293640855146506>All Server:- \`${scount}\`\n<:user:991954430922608650> All user:- \`${mcount}\`\n ${pages[page]}`)

          .setFooter({
            text: `serverlist | Page ${page + 1}/${pages.length}`,
            //iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTitle(`${message.client.user.username} serverlist info`);

        await msg.edit({
          embeds: [embed3],
          components: [row1],
        });
      } else if (button.customId === 'queue_cmd_but_2') {
        await button.deferUpdate().catch(() => {});
        page = page > 0 ? --page : pages.length - 1;

        const embed4 = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`<:guilds:951293640855146506>All Server:- \`${scount}\`\n<:user:991954430922608650> All user:- \`${mcount}\`\n ${pages[page]}`)

          .setFooter({
            text: `serverlist | Page ${page + 1}/${pages.length}`,
           // iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTitle(`${message.client.user.username} serverlist info`);

        await msg
          .edit({
            embeds: [embed4],
            components: [row1],
          })
          .catch(() => {});
      } else if (button.customId === 'queue_cmd_but_3') {
        await button.deferUpdate().catch(() => {});
        collector.stop();
      } else return;
    });

    collector.on('end', async () => {
      await msg.edit({
        components: [],
      });
    });
  },
};
