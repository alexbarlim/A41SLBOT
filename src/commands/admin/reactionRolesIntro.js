const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { primaryColor } = require("../../../config.json");

module.exports = {
    name: "reactionRolesIntro",
    description: "envia um embed com introdução de funções de reação",
    async execute(message, args) {
        const addRolesAttachment = new MessageEmbed()
            .setImage("https://i.imgur.com/w442vDB.png")
            .setColor(primaryColor);

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply("Você não tem permissão para fazer isso");

        const addRolesEmbed = new Discord.MessageEmbed()
            .setColor(primaryColor)

            .setDescription(
                "**Ao aceitar nossas regras e diretrizes da comunidade, você recebe a função**" +
                    "\n" +
                    "<@&696747023772155956>." +
                    " Seja ativo e interaja com a comunidade para abrir caminho na hierarquia e se tornar uma das elites." +
                    "\n" +
                    "\n" +
                    "Boa sorte e divirta-se!"
            );

        message.channel.send(addRolesAttachment).catch(console.error);
        message.channel.send(addRolesEmbed).catch(console.error);
    },
};
