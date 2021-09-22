const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { primaryColor } = require("../../../config.json");

module.exports = {
    name: "reactionRolesGames",
    description: "Envia uma incorporação com uma lista de jogos",
    async execute(message, args) {
        const addRolesAttachment = new MessageEmbed()
            .setImage("https://i.imgur.com/XzvxWtQ.png")
            .setColor(primaryColor);

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply("Você não tem permissão para fazer isso");

        const addRolesEmbed = new Discord.MessageEmbed()
            .setColor(primaryColor)

            .setDescription(
                "**Reaja a esta mensagem com os seguintes emojis correspondentes aos jogos que você joga.**" +
                    "\n" +
                    "\n" +
                    "<:lol:788452092935012362> • League of Legends" +
                    "\n\n" +
                    "<:csgo:788451154576408577> • CSGO" +
                    "\n\n" +
                    "<:r6:788451153523769355> • Rainbow Six Siege" +
                    "\n\n" +
                    "<:amongus:788451152768663642> • Among Us" +
                    "\n\n" +
                    "<:gta5:788451153394270208> • GTA Online" +
                    "\n\n" +
                    "<:wow:788451154362368020> • World of Warcraft" +
                    "\n\n" +
                    "<:fortnite:788451152752672778> • Fortnite" +
                    "\n\n" +
                    "<:brawlhalla:788451163300167770> • Brawlhalla" +
                    "\n\n" +
                    "<:rust:788452945104470017> • Rust" +
                    "\n\n" +
                    "<:minecraft:788618024260861972> • Minecraft" +
                    "\n\n" +
                    "<:dota2:788615300370530305> • Dota 2" +
                    "\n\n" +
                    "<:valorant:788451153108140073> • Valorant" +
                    "\n\n" +
                    "<:apexlegends:788451151480881182> • Apex Legends"
            );

        message.channel.send(addRolesAttachment).catch(console.error);
        message.channel.send(addRolesEmbed).catch(console.error);
    },
};
