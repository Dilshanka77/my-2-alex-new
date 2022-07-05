const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../../schema/setup");
module.exports = {
    name: "setup",
    category: "Settings",
    description: "Set Music channel and setup \`<clear|delete|reset>\` ",
    args: false,
    usage: "",
    aliases: [],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {
        //const embed = new MessageEmbed()
       //.setDescription(`\`coming soon....\` `)
        //.setColor(client.embedColor)
    
      await message.reply(
        { 
            content: `\`coming soon....\``
            //embeds: [embed],
        // components: [row] 
    }
    );
       /* try {
            let data = await db.findOne({ Guild: message.guildId });
            if (args.length) {
                if (!data) return await message.reply({ content: `This server doesn't have any song request channel setup to use this sub command.` });
                if (["clear", "delete", "reset"].includes(args[0])) {
                    await data.delete();
                    return await message.reply({ content: `Successfully deleted all the setup data.` });

                } else return await message.reply({ content: "Please provide a valid  command." });
            } else {
                if (data) return await message.reply({ content: `Music setup is already finished in this server.` });

                //const parentChannel = await message.guild.channels.create(`${client.user.username} Music Zone`, {
                  //  type: "GUILD_CATEGORY",
                   // permissionOverwrites: [
                      //  {
                      //      type: "member",
                      //      id: client.user.id,
                     //       allow: ["CONNECT", "SPEAK", "VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"]
                     //   },
                    //    {
                       //     type: "role",
                     //       id: message.guild.roles.cache.find((x) => x.name === "@everyone").id,
                     ////       allow: ["VIEW_CHANNEL"]
                 //////       }
                //    ]
               // });

                const textChannel = await message.guild.channels.create(`${client.user.username}-song-requests`, {
                    type: "GUILD_TEXT",
                    //parent: parentChannel.id,
                    topic: '',
                    permissionOverwrites: [
                        {
                            type: "member",
                            id: client.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "READ_MESSAGE_HISTORY"]
                        },
                        {
                            type: "role",
                            id: message.guild.roles.cache.find((x) => x.name === "@everyone").id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                        }
                    ]
                });

                let rates = [1000 * 64, 1000 * 96, 1000 * 128, 1000 * 256, 1000 * 384];
                let rate = rates[0];

                switch (message.guild.premiumTier) {
                    case "NONE":
                        rate = rates[1];
                        break;

                    case "TIER_1":
                        rate = rates[2];
                        break;

                    case "TIER_2":
                        rate = rates[3];
                        break;

                    case "TIER_3":
                        rate = rates[4];
                        break;
                };

               // const voiceChannel = await message.guild.channels.create(`${client.user.username} Music`, {
                  //  type: "GUILD_VOICE",
                  //  parent: parentChannel.id,
                  //  bitrate: rate,
                  //  userLimit: 35,
                   // permissionOverwrites: [
                     //   {
                       ////     type: "member",
                      //      id: client.user.id,
                          //  allow: ["CONNECT", "SPEAK", "VIEW_CHANNEL", "REQUEST_TO_SPEAK"]
                      // // },
                       // {
                       ///     type: "role",
                     //       id: message.guild.roles.cache.find((x) => x.name === "@everyone").id,
                       //     allow: ["CONNECT", "VIEW_CHANNEL"],
                     //       deny: ["SPEAK"]
                   //     }
               //     ]
            ///   });


                let disabled = true;
                let player = client.manager.players.get(message.guildId);
                if (player) disabled = false;

                const title = player && player.queue && player.current ? `Now playing` : "Nothing is playing right now";
                const desc = player && player.queue && player.current ? `[${player.current.title}](${player.current.uri})` : `**Join a Voice Channel and Type Song Link/Name to Play**\n>>> \`Support Youtube , Spotify , Soundclound and More\`\n[Invite](${client.config.links.invite}) - [Support Server](${client.config.links.support}) - [vote](${client.config.links.vote})- [web](${client.config.links.web})`;
                const footer = {
                    text: player && player.queue && player.current ? `Requested by ${player.current.requester.tag}` : "",
                    iconURL: player && player.queue && player.current ? `${player.current.requester.displayAvatarURL({ dynamic: true })}` : `${client.user.displayAvatarURL({ dynamic: true })}`
                };
                const image = client.config.links.bg;

                let embed1 = new MessageEmbed().setColor(client.embedColor).setTitle(title).setFooter({ text: footer.text, iconURL: footer.iconURL }).setImage(image);
                //let embed2 = new MessageEmbed()
                

                if (player && player.queue && player.current) embed1.setDescription(desc);
                const but1 = new MessageButton().setCustomId(`${message.guildId}pause`).setLabel(`pause & resumed`).setEmoji(`⏯`).setStyle('SECONDARY').setDisabled(true)
                const but2 = new MessageButton().setCustomId(`${message.guildId}previous`).setLabel(`previous`).setEmoji(`⏮️`).setStyle('SECONDARY').setDisabled(true)
                const but3 = new MessageButton().setCustomId(`${message.guildId}skip`).setLabel(`skip`).setEmoji(`⏭️`).setStyle('SECONDARY').setDisabled(true)
                const but4 = new MessageButton().setCustomId(`${message.guildId}voldown`).setLabel(`voldown`).setEmoji(`🔉`).setStyle('SECONDARY').setDisabled(true)
                const but5 = new MessageButton().setCustomId(`${message.guildId}volup`).setLabel(`volup`).setEmoji(`🔊`).setStyle('SECONDARY').setDisabled(true)
                const but6 = new MessageButton().setCustomId(`${message.guildId}stop`).setLabel(`stop`).setEmoji(`⏹`).setStyle('SECONDARY').setDisabled(true)
                const but7 = new MessageButton().setCustomId(`${message.guildId}autoplay`).setLabel(`autoplay`).setEmoji(`🔀`).setStyle('SECONDARY').setDisabled(true)

                const row1 = new MessageActionRow().addComponents(but4, but2, but1, but3, but5)
                const row2 = new MessageActionRow().addComponents(but6,but7)

                const msg = await textChannel.send({
                    embeds: [embed1],
                    components: [row1, row2]
                });

                const Ndata = new db({
                    Guild: message.guildId,
                    Channel: textChannel.id,
                    Message: msg.id,
                   // voiceChannel: voiceChannel.id,
                });

                await Ndata.save();
                return await message.channel.send({
                    embeds: [new MessageEmbed().setColor(client.embedColor).setTitle("Setup Finished").setDescription(`**Song request channel has been created.**\n\nChannel: ${textChannel}\n\nNote: Deleting the template embed in there may cause this setup to stop working. (Please don't delete it.)*`).setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })]
                });
            };
        } catch (error) {
            console.error(new Error(error));
        };*/
    }
}