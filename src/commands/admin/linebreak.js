const Discord = require("discord.js");

module.exports = {
        name: "linebreak",
        description: "Envia uma mensagem vazia",
        async execute(message, args) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                        return message.reply(
                                "Você não tem permissão para fazer isso"
                        );
                message.channel.send("‎");
        },
};
