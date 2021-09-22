const Discord = require("discord.js");

module.exports = {
    name: "join",
    description: "Conecta o bot ao seu canal de voz",
    async execute(message, args) {
        if (!message.member.hasPermission("CONNECT"))
            return message.reply("Você não tem permissão para fazer isso");

        if (message.member.voice.channel) {
            connection = await message.member.voice.channel.join();
        } else {
            message.reply("Você tem que estar em um canal de voz para tocar música");
        }
    },
};
