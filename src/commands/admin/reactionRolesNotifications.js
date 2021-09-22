const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { primaryColor } = require("../../../config.json");

module.exports = {
    name: "reactionRolesNotifications",
    description: "Envia uma incorporação com uma lista de notificações",
    async execute(message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply("Você não tem permissão para fazer isso");

        const addRolesAttachment = new MessageEmbed()
            .setImage("https://i.imgur.com/sTQnkvP.png")
            .setColor(primaryColor);

        const addRolesEmbed = new Discord.MessageEmbed()
            .setColor("#00FF00")
            .setDescription(
                "**Reaja com o emoji correspondente para receber notificações.**" +
                    "\n" +
                    "\n" +
                    "<:announcements_icon:788964246150709318> • Announcements" +
                    "\n\n" +
                    "<:events:788964246276931584> • Events" +
                    "\n\n" +
                    "<:memes:788964245931819039> • Memes" +
                    "\n\n" +
                    "<:giveaways_icon:788965835855233046>  • Giveaways"
            );

        message.channel.send(addRolesAttachment).catch(console.error);
        message.channel.send(addRolesEmbed).catch(console.error);
    },
};
