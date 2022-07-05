const { MessageEmbed, Client, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
//const { buttonReply } = require("../../utils/functions");

const { trackStartEventHandler } = require("../../utils/functions");
const db = require("../../schema/setup");
//const { InteractionResponseTypes } = require("discord.js/typings/enums.js");

module.exports = {
	name: "playerStart",
	/**
	 * Interaction
	 * @param {Client} client 
	 * @param {*} player 
	 * @param {*} track 
	 */

	run: async (client, player, track, message, query) => {
		//const SlashCommands = client.slashCommands.get(interaction.commandName);

		const color = client.embedColor;
		const emojipause = client.emoji.pause;
        const emojiresume = client.emoji.resume;
        const emojiskip = client.emoji.skip;
        const volumeEmoji = client.emoji.volumehigh;
        const previousEmoji = client.emoji.previous;
        

		let guild = client.guilds.cache.get(player.guild);
		if (!guild) return;
		let channel = guild.channels.cache.get(player.text);
		if (!channel) return;
		let data = await db.findOne({ Guild: guild.id });
		if (data && data.Channel) {
			let textChannel = guild.channels.cache.get(data.Channel);
			const id = data.Message;
			if (channel === textChannel) {
				return await trackStartEventHandler(id, textChannel, player, track, client);
			} else {
				await trackStartEventHandler(id, textChannel, player, track, client);
			};
		}
		
		const emojiplay = client.emoji.play;

		const main = new MessageEmbed()
			//.setAuthor({ name: 'Starting Playing...'})
			.setDescription(`${emojiplay} - Now Playing \n [${track.title}](${track.uri})`)
			.setURL(`https://discord.gg/hKWE5FgxUy`)
			.setColor(client.embedColor)
			//.setTimestamp()
			//.setFooter({ text: 'Alexia', iconURL: 'https://cdn.discordapp.com/avatars/976073875072901170/3f6da8bf7b5c731424a7361f4ea63692.png?size=4096&ignore=true)'})
			
			.setThumbnail(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`}`)


			.addFields([
				{
				  name: `**Requested By **`,
				  value: `\`${player.current.requester.tag}\``,
				  inline: true,
				},
        {
          name: '**Author**',
          value: `\`${player.current.author}\``,
          inline: true,
        },
        
				{
				  name: `** Duration **`,
				  value: `\`${track.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)}\``,
				  inline: true,
				},
				
				
			  ])
			const but1 = new MessageButton().setCustomId(`1pause3`).setLabel(`pause & resumed`).setEmoji(`<:Previous4:992417244640444476>`).setStyle('SECONDARY').setDisabled(false)
            const but2 = new MessageButton().setCustomId(`1previous`).setLabel(`previous`).setEmoji(`${client.emoji.previous}`).setStyle('SECONDARY').setDisabled(false)
            const but3 = new MessageButton().setCustomId(`1skip`).setLabel(`skip`).setEmoji(`${client.emoji.skip}`).setStyle('SECONDARY').setDisabled(false)
            const but4 = new MessageButton().setCustomId(`1voldown`).setLabel(`voldown`).setEmoji(`${client.emoji.volumelow}`).setStyle('SECONDARY').setDisabled(false)
            const but5 = new MessageButton().setCustomId(`1volup`).setLabel(`volup`).setEmoji(`${client.emoji.volumehigh}`).setStyle('SECONDARY').setDisabled(false)
            const but6 = new MessageButton().setCustomId(`1stop`).setLabel(`stop`).setEmoji(`${client.emoji.stop}`).setStyle('SECONDARY').setDisabled(false)
            const but7 = new MessageButton().setCustomId(`1autoplay`).setLabel(`autoplay`).setEmoji(`${client.emoji.autoplay}`).setStyle('SECONDARY').setDisabled(false)
			const but8 = new MessageButton().setCustomId(`+10se`).setLabel(`+10 se`).setEmoji(`<:forward:993173755922763840>`).setStyle('SECONDARY').setDisabled(false)
			const but9 = new MessageButton().setCustomId(`loop`).setLabel(`loop`).setEmoji(`${client.emoji.loop}`).setStyle('SECONDARY').setDisabled(false)
			const but10 = new MessageButton().setCustomId(`-10se`).setLabel(`-10se`).setEmoji(`<:rewind:992425662931533915>`).setStyle('SECONDARY').setDisabled(false)

			const row1 = new MessageActionRow().addComponents(but4, but2, but1, but3, but5)
			const row2 = new MessageActionRow().addComponents(but6,but7,but8,but9,but10)

    

        
			
		await client.channels.cache.get(player.text)?.send({embeds: [main] ,components: [row1, row2]})
        .then(async (x) => player.data.set("message", x));
		await player.data.set("autoplaySystem", player.current.identifier);
			

			

		const collector = client.channels.cache.get(player.text)?.createMessageComponentCollector({
			
			
			time: player.player.position >= player.current.length,
			//time: player.current.length,
			//idle: 30e3,
		//  });
		//  let icon = `${player.current.thumbnail ? player.current.thumbnail : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`}` || client.config.links.bg;
		 // let nowplaying = new MessageEmbed().setColor(color).setDescription(`[${player.current.title}](${player.current.uri}) • \`[ ${player.current.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)} ]\``).setImage(icon).setFooter({ text: `Requested by ${player.current.requester.tag}`, iconURL: player.current.requester.displayAvatarURL({ dynamic: true }) 
		});




	 	collector.on('collect', async (i) => {
			//await i.editReply({
				//ephemeral: true
			 // });
			 //if (!i.replied) await i.deferUpdate({ ephemeral: true });
			//if (!i.deferred)  await i.deferUpdate().catch(() => {});
			if(!i.deferred) await i.deferUpdate()
			//if (!i.deferred) await i.deferUpdate().catch(() => {});
			const embed31agg = new MessageEmbed()
				.setColor(color)
				.setDescription('You are not connected to a voice channel to use this button')

			if (!i.member.voice.channel) return await i.editReply({Embed: [embed31agg],ephemeral: true})

//			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
			//(interaction, `You are not connected to a voice channel to use this button.`, color);
			if (i.customId === '1pause3') {
				
			//	i.deferUpdate()
			  //await button.deferUpdate().catch(() => {});
			 // page = page + 1 < pages.length ? ++page : 0;
			 if (player.player.paused) {
                await player.setPaused(false);

				const embed31a = new MessageEmbed()
				.setColor(color)
				.setDescription('resume')

				await client.channels.cache.get(player.text)?.send({
					embeds: [embed31a],
					//components: [row1],
				  })
				  .then(thing => { setTimeout(() => { thing.delete() }, 5000) });
               // await msg.Reply(button, `${emojiresume} [${player.current.title}](${player.current.uri}) is now unpaused/resumed.`, color);
                //if (msg) await msg.edit({
                //    embeds: [nowplaying]
                //}).catch(() => { });
            } else {
				
                await player.setPaused(true);

				const embed3x = new MessageEmbed()
				.setColor(color)
				.setDescription('pause')

				await client.channels.cache.get(player.text)?.send({
					embeds: [embed3x],
					//components: [row1],
				  })
				  .then(thing => { setTimeout(() => { thing.delete() }, 5000) });
                //await msg.Reply(button, `${emojipause} [${player.current.title}](${player.current.uri}) is now paused.`, color);
                //if (msg) await msg.edit({
                    //embeds: [nowplaying]
                //}).catch(() => { });
            };
  
			}else if (i.customId === `1skip`) {
			///	i.deferUpdate()
				const embed34g = new MessageEmbed()
				.setColor(color)
				.setDescription(`No more songs left in the queue to skip.`)
				if (player.queue.length === 0) return await client.channels.cache.get(player.text)?.send({embeds: [embed34g],})
				.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
				await player.player.stopTrack();
				//if (message) await message.edit({
					//embeds: [nowplaying]
				//}).catch(() => { });
				const embed3t = new MessageEmbed()
				.setColor(color)
				.setDescription(`${emojiskip} Skipped - [${player.current.title}](${player.current.uri})`)


				await client.channels.cache.get(player.text)?.send({embeds: [embed3t],})
				.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
		
		}
		//
		//else if (button.customId === `+10`) {
			//const position = player.player.position;
           // const duration = player.current.length;

				//  await player.player.duration(+10);
				 // let thing = new MessageEmbed()
				//	.setDescription(`gdgfdgf`)
				//	.setColor(client.embedColor);
				//  return await client.channels.cache.get(player.text)?.send({ embeds: [thing] });

				  
				 
			  



			
		//}
		else if (i.customId === `1stop`) {
			//i.deferUpdate()
			//if (SlashCommands.sameVoiceChannel){
			if (i.guild.me.voice.channel) {
				if (i.guild.me.voice.channelId !== i.member.voice.channelId) {
					let thingbbl = new MessageEmbed()
				.setDescription(`not playing Music plss play mysic and use the command`)
					.setColor(client.embedColor);

				  await client.channels.cache.get(player.text)?.send({
					embeds: [thingbbl],
					  //content: `You must be in the same channel as ${button.client.user}`,
					  ephemeral: true,
					})
					//.catch(() => { });
				}
			 // }
			}
			
			  else if (!player.current) {
				let thingl = new MessageEmbed()
				.setDescription(`not playing Music plss play mysic and use the command`)
					.setColor(client.embedColor);
					await client.channels.cache.get(player.text)?.send({ embeds: [thingl] });

				//await buttonReply(interaction, ``, color);
			   }
			 player.queue.length = 0;
			 player.repeat = 'off';
			 player.data.delete("autoplay")
			 player.stopped = true;
			 await player.player.stopTrack();
			 if (!player.queue[0])
			 var size = player.queue[0];
			   player.queue = [];
			 const emojistop = client.emoji.stop;
			 let thing0 = new MessageEmbed()
			 .setDescription(`${emojistop} Stopped the music`)
					.setColor(client.embedColor)

			 await client.channels.cache.get(player.text)?.send({ embeds: [thing0] })
			 .then(thing => { setTimeout(() => { thing.delete() }, 5000) });
		  //// if (message) await message0778350001.edit({
			   //embeds: [nowplaying]
		   //}).catch(() => { });


		}else if (i.customId === `1autoplay`) {
			//i.deferUpdate()
			const player = client.manager.players.get(i.guild.id);
        const emojireplay = client.emoji.autoplay;
        player.data.set("autoplay", !player.data.get("autoplay"));
        player.data.set("requester", i.user);
        let thing7mmm = new MessageEmbed()
            .setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`${emojireplay} Autoplay is now ${player.data.get("autoplay") ? "**enabled**" : "**disabled**"}.`)
         await client.channels.cache.get(player.text)?.send({ embeds: [thing7mmm] })
        .then(thing => { setTimeout(() => { thing.delete() }, 5000) });



		}else if (i.customId === `1voldown`) {
			//i.deferUpdate()
			let amount = Number(player.player.filters.volume * 100 - 10);
			let thingm = new MessageEmbed()
			
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`Volume Cannot Decread \`[ 10% ]\` `)

            if (amount <= 10) return await client.channels.cache.get(player.text)?.send({ embeds: [thingm] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
            //if (message) await message.edit({  (interaction, `Volume Cannot Decread \`[ 10% ]\`.`, color);
               // embeds: [nowplaying]
           // }).catch(() => { });
            await player.setVolume(amount / 1);
			let thingh1 = new MessageEmbed()
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`${volumeEmoji} Volume set to: \`[ ${player.player.filters.volume * 100}% ]\``)
            await client.channels.cache.get(player.text)?.send({ embeds: [thingh1] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
			//(interaction, `${volumeEmoji} Volume set to: \`[ ${player.player.filters.volume * 100}% ]\``, color);
           // if (message) await message.edit({
            //    embeds: [nowplaying]
           // }).catch(() => { });

		}else if (i.customId === `1volup`) {
			//i.deferUpdate()
			let amount = Number(player.player.filters.volume * 100 + 10);
			let things1cc = new MessageEmbed()
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`Volume Cannot Exceed \`[ 100% ]\``)
            if (amount >= 100) return await client.channels.cache.get(player.text)?.send({ embeds: [things1cc] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
			//(interaction, `Volume Cannot Exceed \`[ 100% ]\``, color);
            await player.setVolume(amount / 1);
			let thing122 = new MessageEmbed()
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`${volumeEmoji} Volume set to: \`[ ${player.player.filters.volume * 100}% ]\``)
            await client.channels.cache.get(player.text)?.send({ embeds: [thing122] })
			//(interaction, `${volumeEmoji} Volume set to: \`[ ${player.player.filters.volume * 100}% ]\``, color)
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
           // if (message) await message.edit({
                //embeds: [nowplaying]
            //}).catch(() => { });

		}else if (i.customId === `1previous`) {
			//i.deferUpdate()
			if (!player.previous) {
				let thing12 = new MessageEmbed()
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`No Previous song found`)
             await client.channels.cache.get(player.text)?.send({ embeds: [thing12] })
				.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
				//(interaction, `No Previous song found`, color);
            }
            if (player.previous) {
                player.queue.unshift(player.previous);
                await player.player.stopTrack();
            }
			let thing123 = new MessageEmbed()
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`${previousEmoji} Previous [${player.previous.title}](${player.previous.uri})`)
            await client.channels.cache.get(player.text)?.send({ embeds: [thing123] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
			//(interaction, `${previousEmoji} Previous [${player.previous.title}](${player.previous.uri})`, color);
           // if (message) await message.edit({
               // embeds: [nowplaying]
           // }).catch(() => { });

		} else if (i.customId === `+10se`) {
            const position = player.player.position;
            const duration = player.current.length;
            const time = position + 10000;
        
            const emojiforward = client.emoji.forward;
            const emojirewind = client.emoji.rewind;
            if (!player.current) {
                let thing = new MessageEmbed().setColor('RED').setDescription('not playing Music plss play mysic and use the command');
                return message.reply({ embeds: [thing] });
            } else if (time >= duration){
                let thing123 = new MessageEmbed()
                .setColor('RED')
                // .setTimestamp()
                .setDescription(`Track ends within 10 seconds`)
                await client.channels.cache.get(player.text)?.send({ embeds: [thing123] })
                .then(thing => { setTimeout(() => { thing.delete() }, 5000) });
            } else {       
            await player.player.seekTo(time);
			let thing123 = new MessageEmbed()
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`${previousEmoji} Forwarded +10 seconds`)
            await client.channels.cache.get(player.text)?.send({ embeds: [thing123] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
            }
		} else if (i.customId === `loop`) {
			
			if (i.repeatMode === 0) {
			await player.setLoop('queue');
			let thing = new MessageEmbed()
			.setColor(client.embedColor)
			.setDescription(`${previousEmoji} Loop queue is now **enable**`);
			await client.channels.cache.get(player.text)?.send({ embeds: [thing] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
			
			

			}else if(i.repeatMode === 1){
				await player.setLoop('track');
			let thing = new MessageEmbed()
			.setColor(client.embedColor)
			.setDescription(`${previousEmoji} Loop track is now **enable**`);
			await client.channels.cache.get(player.text)?.send({ embeds: [thing] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
			}else if(i.repeatMode === 2){
				await player.setLoop('off');
			let thing = new MessageEmbed()
			.setColor(client.embedColor)
			.setDescription(`${previousEmoji} Loop is now **disabled**`);
			await client.channels.cache.get(player.text)?.send({ embeds: [thing] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
			}

			
			

		}else if (i.customId === `-10se`) {

			const position = player.player.position;
            const duration = player.current.length;
            const time = position - 10000;
        
            const emojiforward = client.emoji.forward;
            const emojirewind = client.emoji.rewind;
            if (!player.current) {
                let thing = new MessageEmbed().setColor('RED').setDescription('not playing Music plss play mysic and use the command');
                return message.reply({ embeds: [thing] });
            } else if (time >= duration){
                let thing123 = new MessageEmbed()
                .setColor('RED')
                // .setTimestamp()
                .setDescription(`Track ends within 10 seconds`)
                await client.channels.cache.get(player.text)?.send({ embeds: [thing123] })
                .then(thing => { setTimeout(() => { thing.delete() }, 5000) });
            } else {       
            await player.player.seekTo(time);
			let thing123 = new MessageEmbed()
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`${emojirewind} Rewind -10 seconds`)
            await client.channels.cache.get(player.text)?.send({ embeds: [thing123] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
            }
            /*const position = player.player.position;
            const duration = player.current.length;
            const time = position - 10000;
        
            const emojiforward = client.emoji.forward;
            const emojirewind = client.emoji.rewind;
            if (!player.current) {
                let thing = new MessageEmbed().setColor('RED').setDescription('not playing Music plss play mysic and use the command');
                return message.reply({ embeds: [thing] });
            } else if (time <= duration){
                let thing123 = new MessageEmbed()
                .setColor('RED')
                // .setTimestamp()
                .setDescription(`Track starts within 10 seconds`)
                await client.channels.cache.get(player.text)?.send({ embeds: [thing123] })
                .then(thing => { setTimeout(() => { thing.delete() }, 5000) });
            } else {       
            await player.player.seekTo(time);
			let thing123 = new MessageEmbed()
			.setColor(client.embedColor)
           // .setTimestamp()
            .setDescription(`${previousEmoji} Rewinded 10 seconds`)
            await client.channels.cache.get(player.text)?.send({ embeds: [thing123] })
			.then(thing => { setTimeout(() => { thing.delete() }, 5000) });
            }*/collector.on('end', async () => {
				return collector.stop();
      });


			

		}
		
		
	})

   
	
	}
	
};



