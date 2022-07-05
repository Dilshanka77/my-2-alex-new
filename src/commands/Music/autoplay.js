const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    category: "Music",
    description: "Toggle music autoplay",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.players.get(message.guild.id);
       // const player = client.manager.players.get(message.guild.id);
       if (!message.author.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return await message.author.dmChannel
        .send({
          content: `<@${message.author.id} you have not permission`,
        })
        .catch(() => { });
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('not playing Music plss play mysic and use the command');
      return message.reply({ embeds: [thing] });
    }
        const emojireplay = client.emoji.autoplay;
        player.data.set("autoplay", !player.data.get("autoplay"));
        player.data.set("requester", message.author);
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
               // .setTimestamp()
                .setDescription(`${emojireplay} Autoplay :-\`${player.data.get("autoplay") ? "on" : "off"}\`.`)
            return message.channel.send({ embeds: [thing] });
        }
    
}
