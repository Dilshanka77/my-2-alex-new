const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require("../../schema/setup");
const db2 = require("../../schema/autoReconnect");

module.exports = {
    name: "playerDestroy",
    run: async (client, player) => {
        client.logger.log(`Player Destroy in @ ${player.guild}`, "log");
        if (player.data.get("autoplay")) try { player.data.delete("autoplay") } catch (err) { client.logger.log(err.stack ? err.stack : err, "log") };
        let guild = client.guilds.cache.get(player.guild);
        if (!guild) return;
        const data = await db.findOne({ Guild: guild.id });
        if (!data) return;

        let channel = guild.channels.cache.get(data.Channel);
        if (!channel) return;

        let message;

        try {

            message = await channel.messages.fetch(data.Message, { cache: true });

        } catch (e) { };

        if (!message) return;
        let disabled = true;
        if (player && player.queue && player.current) disabled = false;
        

        let embed1 = new MessageEmbed().setColor(client.embedColor).setTitle(`Nothing playing right now in this server!`).setDescription(`**Join a Voice Channel and Type Song Link/Name to Play**\n>>> \`Support Youtube , Spotify , Soundclound and More\`\n[Invite](${client.config.links.invite}) - [Support Server](${client.config.links.support}) - [vote](${client.config.links.vote})- [web](${client.config.links.web})`).setImage(client.config.links.bg);
        const but1 = new MessageButton().setCustomId(`${message.guildId}pause`).setLabel(`pause & resumed`).setEmoji(`⏯`).setStyle('SECONDARY').setDisabled(true)
        const but2 = new MessageButton().setCustomId(`${message.guildId}previous`).setLabel(`previous`).setEmoji(`⏮️`).setStyle('SECONDARY').setDisabled(true)
        const but3 = new MessageButton().setCustomId(`${message.guildId}skip`).setLabel(`skip`).setEmoji(`⏭️`).setStyle('SECONDARY').setDisabled(true)
        const but4 = new MessageButton().setCustomId(`${message.guildId}voldown`).setLabel(`voldown`).setEmoji(`🔉`).setStyle('SECONDARY').setDisabled(true)
        const but5 = new MessageButton().setCustomId(`${message.guildId}volup`).setLabel(`volup`).setEmoji(`🔊`).setStyle('SECONDARY').setDisabled(true)
        const but6 = new MessageButton().setCustomId(`${message.guildId}stop`).setLabel(`stop`).setEmoji(`⏹`).setStyle('SECONDARY').setDisabled(true)
        const but7 = new MessageButton().setCustomId(`${message.guildId}autoplay`).setLabel(`autoplay`).setEmoji(`🔀`).setStyle('SECONDARY').setDisabled(true)
       // const but8 = new MessageButton().setCustomId(`${message.guildId}loop`).setEmoji(`🔁`).setStyle('SECONDARY').setDisabled(disabled)
        //const but9 = new MessageButton().setCustomId(`${message.guildId}-10`).setEmoji(`⏪`).setStyle('SECONDARY').setDisabled(disabled)

        const row1 = new MessageActionRow().addComponents(but4, but2, but1, but3, but5)
        const row2 = new MessageActionRow().addComponents(but6,but7)
        await message.edit({
          //  content: "__**Join a voice channel and queue songs by name/url**__\n\n",
            embeds: [embed1],
            components: [row1,row2]
        });
        const vc = await db2.findOne({Guild: player.guild})
        if(vc) await client.manager.createPlayer({
            guildId: vc.Guild,
            voiceId: vc.VoiceId,
            textId: vc.TextId,
            deaf: true,
          });
    }

};
