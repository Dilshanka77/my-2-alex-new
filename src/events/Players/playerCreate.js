const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require("../../schema/setup");

module.exports = {
    name: "playerCreate",
    run: async (client, player,track) => {

        //const tracks = result.tracks;

        
        client.logger.log(`Player Create in @ ${player.guild}`, "log");

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
       // const player = client.manager.players.get(message.guild.id);



      


        const but1 = new MessageButton().setCustomId(`${message.guildId}pause`).setLabel(`pause & resumed`).setEmoji(`⏯`).setStyle('SECONDARY').setDisabled(false)
        const but2 = new MessageButton().setCustomId(`${message.guildId}previous`).setLabel(`previous`).setEmoji(`⏮️`).setStyle('SECONDARY').setDisabled(false)
        const but3 = new MessageButton().setCustomId(`${message.guildId}skip`).setLabel(`skip`).setEmoji(`⏭️`).setStyle('SECONDARY').setDisabled(false)
        const but4 = new MessageButton().setCustomId(`${message.guildId}voldown`).setLabel(`voldown`).setEmoji(`🔉`).setStyle('SECONDARY').setDisabled(false)
        const but5 = new MessageButton().setCustomId(`${message.guildId}volup`).setLabel(`volup`).setEmoji(`🔊`).setStyle('SECONDARY').setDisabled(false)
        const but6 = new MessageButton().setCustomId(`${message.guildId}stop`).setLabel(`stop`).setEmoji(`⏹`).setStyle('SECONDARY').setDisabled(false)
        const but7 = new MessageButton().setCustomId(`${message.guildId}autoplay`).setLabel(`autoplay`).setEmoji(`🔀`).setStyle('SECONDARY').setDisabled(false)
        //const but8 = new MessageButton().setCustomId(`${message.guildId}loop`).setEmoji(`🔁`).setStyle('SECONDARY').setDisabled(false)
        //const but9 = new MessageButton().setCustomId(`${message.guildId}-10`).setEmoji(`⏪`).setStyle('SECONDARY').setDisabled(false)

        const row1 = new MessageActionRow().addComponents(but4, but2, but1, but3, but5)
        const row2 = new MessageActionRow().addComponents(but6,but7)



        await message.edit({ 
           // content: "__**Join a voice channel and queue songs by name/url.**__\n\n",
          // embeds: [embed2],
             components: [row1, row2] }).catch(() => { });

    }
};