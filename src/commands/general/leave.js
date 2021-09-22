const Discord = require("discord.js");

module.exports = {
    name: "leave",
    description: "Desconecta o bot do seu canal de voz",
    async execute(message, args) {
        if (!message.member.hasPermission("CONNECT"))
            return message.reply("Você não tem permissão para fazer isso");

        if (message.member.voice.channel) {
            connection = message.member.voice.channel.leave();
        } else {
            message.reply("Eu não estou neste canal de voz para sair!");
        }
    },
};
