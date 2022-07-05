const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js');
const db = require('../../schema/prefix.js');
const db2 = require('../../schema/setup');
const db3 = require("../../schema/dj");
const db4 = require('../../schema/count');
const db5 = require('../../schema/profile.js')

module.exports = {
  name: 'messageCreate',
  run: async (client, message) => {
    var invite = client.config.links.invite;
    var support = client.config.links.support;
    var vote = client.config.links.vote;
    var web = client.config.links.web;

    if (message.author.bot) return;
    if (!message.guild) return;
    let data = await db2.findOne({ Guild: message.guildId });
    if (data && data.Channel && message.channelId === data.Channel) return client.emit("setupSystem", message);
    let prefix = client.prefix;
    const channel = message?.channel;
    const ress = await db.findOne({ Guild: message.guildId });
    if (ress && ress.Prefix) prefix = ress.Prefix;
   
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const row3 = new MessageActionRow().addComponents(
        new MessageButton().setLabel('invite').setStyle('LINK').setURL(invite),
        new MessageButton().setLabel('support').setStyle('LINK').setURL(support),
        new MessageButton().setLabel('vote').setStyle('LINK').setURL(vote),
        new MessageButton().setLabel('website').setStyle('LINK').setURL(web),
        new MessageButton().setLabel('sponsor').setStyle('LINK').setURL('https://auto.creavite.co/').setEmoji('<:creative:983624593610772500>'),
    );

        const embed = new MessageEmbed()
            .setColor(client.embedColor)
            .setThumbnail(client.user.displayAvatarURL())
            .setImage(`https://cdn.discordapp.com/attachments/981575766347218975/982656912334127184/standard_1.gif`)
            .setDescription(`Hey **${message.author.username}**,\n <a:prefix:951874675728855040>prefix To Get My Help Menu Use ${prefix}help or /help\n\n <a:warning2:959731561245311016> **__This Is A Slash Command Music Bot!__**\n <:Slash:950797725258092614>**Note -** If Slash Command Not Working Then Kick The Bot And Re-Invite With This [link](https://discord.com/api/oauth2/authorize?client_id=976073875072901170&permissions=397619363193&scope=bot%20applications.commands)\n\n <a:945587081734926386:951847244213129226>**Bot Developer Info**`)
            .setFooter({ text: 'Alexia', iconURL: 'https://cdn.discordapp.com/avatars/976073875072901170/3f6da8bf7b5c731424a7361f4ea63692.png?size=4096&ignore=true)'})

            .setFields([
              { name: "<:Users:951292896630423582>Made By:", value: `[Dilshan_Ka#4067](https://discord.gg/hKWE5FgxUy)`,inline: true },
              
              
              
              
            
              
            ]);
        message.reply({ embeds: [embed], components: [row3] })
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES))
      return await message.author.dmChannel
        .send({
          content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => { });

    if (!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

    if (!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS))
      return await message.channel
        .send({
          content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => { });

    const embed = new MessageEmbed().setColor('RED');

    // args: true,
   // if (command.args && !args.length) {
     // let reply = `You didn't provide any arguments, ${message.author}!`;

      // usage: '',
      //if (command.usage) {
      //  reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
    //  }
///
   //   embed.setDescription(reply);
   //   return message.channel.send({ embeds: [embed] });
   // }

    if (command.userPrams && !message.member.permissions.has(command.userPrams)) {
      embed.setDescription(
        `You need to this \`${command.userPrams.join(', ')}\` permission use this command.`,
      );
      return message.channel.send({ embeds: [embed] });
    }
    if (command.botPrams && !message.guild.me.permissions.has(command.botPrams)) {
      embed.setDescription(
        `I need this \`${command.userPrams.join(', ')}\` permission use this command.`,
      );
      return message.channel.send({ embeds: [embed] });
    }
    if (
      !channel.permissionsFor(message.guild.me)?.has(Permissions.FLAGS.EMBED_LINKS) &&
      client.user.id !== userId
    ) {
      return channel.send({ content: `Error: I need \`EMBED_LINKS\` permission to work.` });
    }
    if (command.owner) {
      if (client.owner) {
        const devs = client.owner.find((x) => x === message.author.id);
        if (!devs)
          return message.channel.send({
            embeds: [embed.setDescription(`\`owners Only\` [ [Dilshan_Ka#4067](https://discord.gg/hKWE5FgxUy),[DK.Kratos#3877](https://discord.gg/b5cxhABbkT),[!DRACO#3042](https://discord.gg/RGwm7bq5hp) ] `)],
          });
      }
    }
    //const mmention = new RegExp(`^(d!)\\s*`);
   // if (message.content.match(mmention)) {
   // if (command.count) {
      //if (client.count) {
        //await countn.create({
        //  UserId: message.user.id,
        // 
         // channel: channel.id,
         // guild: message.guild.id
       // })


       //await db4.updateOne(
       // {
        //  UserId: message.author.id,
        //  Count: 0,
          
       // })
       // await newData.save();
        //let data = await db4.findOne({ Count: Count(count + 1) });
        //await db.updateOne(
         // {
          //  UserId: message.author.id,
           // count: count(count + 1),
       // },
      // );
       // let data = await db.find({
         // UserId: message.author.id,
         // PlaylistName: Name,
        //});

        //const devs = client.co.find((x) => x === message.author.id);
       // if (!devs)
         // return message.channel.send({
           // embeds: [embed.setDescription('Only [ <@500534128521904129>,<@868098748281155595>,<@828968509420732446> ] can use this command!')],
          //});
    //  }
   // }
    const player = client.manager.players.get(message.guild.id);
    if (command.player && !player) {
      embed.setDescription('There is no play music for this guild.');
      return message.channel.send({ embeds: [embed] });
    }
    if (command.inVoiceChannel && !message.member.voice.channelId) {
      embed.setDescription('You Need to Join Voice Channel      ');
      return message.channel.send({ embeds: [embed] });
    }
    
    if (command.sameVoiceChannel) {
      if (message.guild.me.voice.channel) {
        if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
          embed.setDescription(`I'm already connected to <#${player.voice}> voice channel!`);
          return message.channel.send({ embeds: [embed] });
        }
      }
    }
    if (command.dj) {
      let data = await db3.findOne({ Guild: message.guild.id })
      let perm = Permissions.FLAGS.MANAGE_GUILD;
      if (data) {
        if (data.Mode) {
          let pass = false;
          if (data.Roles.length > 0) {
            message.member.roles.cache.forEach((x) => {
              let role = data.Roles.find((r) => r === x.id);
              if (role) pass = true;
            });
          };
          if (!pass && !message.member.permissions.has(perm)) return message.channel.send({ embeds: [embed.setDescription(`You don't have permission or dj role to use this command`)] })
        };
      };
    }
    try {
        let dataprofile = await db5.find({
          GuildId: message.guild.id,
          UserId: message.author.id,
        });
        if (!dataprofile) {
            new db5({
              GuildId: message.guild.id,
              UserId: message.author.id,
              CommandCount: 1,
              Playedsong: 0,
            });
        } else {
          let newcmdcount = ((dataprofile.CommandCount)+1);
          await db.updateOne({
            GuildId: message.guild.id,
            UserId: message.author.id,
            CommandCount: newcmdcount,
            Playedsong: (dataprofile.Playedsong),
          });
        }
      command.execute(message, args, client, prefix);
    } catch (error) {
      console.log(error);
      embed.setDescription(
        'There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.',
      );
      return message.channel.send({ embeds: [embed] });
    }
  },
};
