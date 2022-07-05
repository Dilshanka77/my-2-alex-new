const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'filter',
  category: 'Filters',
  aliases: ['8D', '3d'],
  description: 'All Filters',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    const emojiequalizer = message.client.emoji.filter;
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('not playing Music plss play mysic and use the command');
      return message.reply({ embeds: [thing] });
    }
    const Name = args[0];

    if (!Name) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`filter not found. Please enter the \`8d,bass,bassboost,earrape,electronic,equalizer,karaoke,nightcore,party,pop,soft,radio,speed,treblebass,vaporwave\``),
      ],
    });




    let loopmode = args[0];
    let mods = ["8d", "bass", "bassboost", "off", "c", "clear","earrape","electronic","equalizer","karaoke","nightcore","party","pop","radio","soft","speed","treblebass","vaporwave"];
    if (!mods.includes(loopmode)) {
      return message.reply(
        `Wrong Usage :: \`\`\`${mods.join(" , ")}\`\`\``
      );
    }
    if (loopmode === "8d") {
        
        await player.player.setFilters({
            op: 'filters',
            guildId: message.guild.id,
            rotation: { rotationHz: 0.2 },
          });
        
        let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`8D\` Mode Is \`On\``);

        
        return message.reply({
            embeds: [thing12],
           // components: [row1],
          });
    }else if (loopmode === "off"|| loopmode === "c"|| loopmode === "clear") {
    await player.player.clearFilters();
    let thing1 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} filter Mode Is \`Off\``);
    return await message.reply({

     embeds: [thing1],
     //components: [row2],
   });
}else if (loopmode === "bass") {

await player.player.setFilters({
    op: 'filters',
    guildId: message.guild.id,
    equalizer: [
      { band: 0, gain: 0.1 },
      { band: 1, gain: 0.1 },
      { band: 2, gain: 0.05 },
      { band: 3, gain: 0.05 },
      { band: 4, gain: -0.05 },
      { band: 5, gain: -0.05 },
      { band: 6, gain: 0 },
      { band: 7, gain: -0.05 },
      { band: 8, gain: -0.05 },
      { band: 9, gain: 0 },
      { band: 10, gain: 0.05 },
      { band: 11, gain: 0.05 },
      { band: 12, gain: 0.1 },
      { band: 13, gain: 0.1 },
    ],
  });
  let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`bass\` Mode Is \`On\``);

        
        return message.reply({
            embeds: [thing12],
           // components: [row1],
          });
}
else if (loopmode === "bassboost") {

    await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 0, gain: 0.1 },
          { band: 1, gain: 0.1 },
          { band: 2, gain: 0.05 },
          { band: 3, gain: 0.05 },
          { band: 4, gain: -0.05 },
          { band: 5, gain: -0.05 },
          { band: 6, gain: 0 },
          { band: 7, gain: -0.05 },
          { band: 8, gain: -0.05 },
          { band: 9, gain: 0 },
          { band: 10, gain: 0.05 },
          { band: 11, gain: 0.05 },
          { band: 12, gain: 0.1 },
          { band: 13, gain: 0.1 },
        ],
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`bassboost\` Mode Is \`On\``);
    
            
            return message.reply({
                embeds: [thing12],
               // components: [row1],
              });
    }
    else if (loopmode === "earrape") {
        await player.player.setFilters({
            op: 'filters',
            guildId: message.guild.id,
            equalizer: [
              { band: 0, gain: 0.25 },
              { band: 1, gain: 0.5 },
              { band: 2, gain: -0.5 },
              { band: 3, gain: -0.25 },
              { band: 4, gain: 0 },
              { band: 6, gain: -0.025 },
              { band: 7, gain: -0.0175 },
              { band: 8, gain: 0 },
              { band: 9, gain: 0 },
              { band: 10, gain: 0.0125 },
              { band: 11, gain: 0.025 },
              { band: 12, gain: 0.375 },
              { band: 13, gain: 0.125 },
              { band: 14, gain: 0.125 },
            ],
          });
          let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`earrape\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });
    }else if (loopmode === "electronic") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 0, gain: 0.375 },
          { band: 1, gain: 0.35 },
          { band: 2, gain: 0.125 },
          { band: 3, gain: 0 },
          { band: 4, gain: 0 },
          { band: 5, gain: -0.125 },
          { band: 6, gain: -0.125 },
          { band: 7, gain: 0 },
          { band: 8, gain: 0.25 },
          { band: 9, gain: 0.125 },
          { band: 10, gain: 0.15 },
          { band: 11, gain: 0.2 },
          { band: 12, gain: 0.25 },
          { band: 13, gain: 0.35 },
          { band: 14, gain: 0.4 },
        ],
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`electronic\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "equalizer") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 0, gain: 0.375 },
          { band: 1, gain: 0.35 },
          { band: 2, gain: 0.125 },
          { band: 3, gain: 0 },
          { band: 4, gain: 0 },
          { band: 5, gain: -0.125 },
          { band: 6, gain: -0.125 },
          { band: 7, gain: 0 },
          { band: 8, gain: 0.25 },
          { band: 9, gain: 0.125 },
          { band: 10, gain: 0.15 },
          { band: 11, gain: 0.2 },
          { band: 12, gain: 0.25 },
          { band: 13, gain: 0.35 },
          { band: 14, gain: 0.4 },
        ],
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`Equalizer\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "karaoke") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        rotation: { rotationHz: 0.2 },
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`karaoke\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "nightcore") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 1, gain: 0.3 },
          { band: 0, gain: 0.3 },
        ],
        timescale: { pitch: 1.2 },
        tremolo: { depth: 0.3, frequency: 14 },
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`nightcore\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "party") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 0, gain: -1.16 },
          { band: 1, gain: 0.28 },
          { band: 2, gain: 0.42 },
          { band: 3, gain: 0.5 },
          { band: 4, gain: 0.36 },
          { band: 5, gain: 0 },
          { band: 6, gain: -0.3 },
          { band: 7, gain: -0.21 },
          { band: 8, gain: -0.21 },
        ],
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`party\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "pop") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 0, gain: -0.25 },
          { band: 1, gain: 0.48 },
          { band: 2, gain: 0.59 },
          { band: 3, gain: 0.72 },
          { band: 4, gain: 0.56 },
          { band: 5, gain: 0.15 },
          { band: 6, gain: -0.24 },
          { band: 7, gain: -0.24 },
          { band: 8, gain: -0.16 },
          { band: 9, gain: -0.16 },
          { band: 10, gain: 0 },
          { band: 11, gain: 0 },
          { band: 12, gain: 0 },
          { band: 13, gain: 0 },
          { band: 14, gain: 0 },
        ],
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`pop\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "radio") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 0, gain: -0.25 },
          { band: 1, gain: 0.48 },
          { band: 2, gain: 0.59 },
          { band: 3, gain: 0.72 },
          { band: 4, gain: 0.56 },
          { band: 5, gain: 0.15 },
          { band: 6, gain: -0.24 },
          { band: 7, gain: -0.24 },
          { band: 8, gain: -0.16 },
          { band: 9, gain: -0.16 },
          { band: 10, gain: 0 },
          { band: 11, gain: 0 },
          { band: 12, gain: 0 },
          { band: 13, gain: 0 },
          { band: 14, gain: 0 },
        ],
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`radio\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "soft") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 0, gain: 0 },
          { band: 1, gain: 0 },
          { band: 2, gain: 0 },
          { band: 3, gain: 0 },
          { band: 4, gain: 0 },
          { band: 5, gain: 0 },
          { band: 6, gain: 0 },
          { band: 7, gain: 0 },
          { band: 8, gain: -0.25 },
          { band: 9, gain: -0.25 },
          { band: 10, gain: -0.25 },
          { band: 11, gain: -0.25 },
          { band: 12, gain: -0.25 },
          { band: 13, gain: -0.25 },
          { band: 14, gain: -0.25 },
        ],
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`soft\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "speed") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        timescale: {
          speed: 1.501,
          pitch: 1.245,
          rate: 1.921,
        },
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`speed\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "treblebass") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 0, gain: 0.6 },
          { band: 1, gain: 0.67 },
          { band: 2, gain: 0.67 },
          { band: 3, gain: 0 },
          { band: 4, gain: -0.5 },
          { band: 5, gain: 0.15 },
          { band: 6, gain: -0.45 },
          { band: 7, gain: 0.23 },
          { band: 8, gain: 0.35 },
          { band: 9, gain: 0.45 },
          { band: 10, gain: 0.55 },
          { band: 11, gain: 0.6 },
          { band: 12, gain: 0.55 },
          { band: 13, gain: 0 },
          { band: 14, gain: 0 },
        ],
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`treblebass\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }else if (loopmode === "vaporwave") {
      await player.player.setFilters({
        op: 'filters',
        guildId: message.guild.id,
        equalizer: [
          { band: 1, gain: 0.3 },
          { band: 0, gain: 0.3 },
        ],
        timescale: { pitch: 0.5 },
        tremolo: { depth: 0.3, frequency: 14 },
      });
      let thing12 = new MessageEmbed().setColor('RED').setDescription(`${emojiequalizer} \`vaporwave\` Mode Is \`On\``);
    
            
          return message.reply({
              embeds: [thing12],
             // components: [row1],
            });

    }
   /* const emojiequalizer = message.client.emoji.filter;
    collector.on("collect", async (b) => {
      if (!b.replied) await b.deferUpdate({ ephemeral: true });
      if (b.customId === "clear_but") {
        await player.player.clearFilters();
        return await b.editReply({
          embeds: [
            embed1.setDescription(`${emojiequalizer} 8D Mode Is \`OFF\``),
          ],
          components: [row2],
        });
      } else if (b.customId === "8D_but") {
        await player.player.setFilters({
          op: 'filters',
          guildId: message.guild.id,
          rotation: { rotationHz: 0.2 },
        });
        return await b.editReply({
          embeds: [
            embed1.setDescription(`${emojiequalizer} 8D Mode Is \`ON\``),
          ],
          components: [row1],
        });
      }
    });*/
  },
};
