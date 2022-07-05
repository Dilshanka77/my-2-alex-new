const { MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    category: 'Settings',
    description: "Remove Dj Role",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });
        if (!message.author.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return await message.author.dmChannel
        .send({
          content: `<@${message.author.id} you have not permission`,
        })
        .catch(() => { });
        if (data) {
            await data.delete()
            return message.reply({ embeds: [new MessageEmbed().setDescription(`Successfully Removed All DJ Roles.`).setColor(client.embedColor)] })
        } else return message.reply({ embeds: [new MessageEmbed().setDescription(`Don't Have Dj Setup In This Guild`).setColor(client.embedColor)] })

    }
}