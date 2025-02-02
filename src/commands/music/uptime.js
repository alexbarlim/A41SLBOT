const { MessageEmbed } = require("discord.js");
const { primaryColor } = require("../../../config.json");

module.exports = {
  name: "uptime",

  aliases: ["u"],
  description: "Verifique o tempo de atividade do bot",
  execute(message) {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    const uptimeR = new MessageEmbed()
      .setColor(primaryColor)
      .setTitle("Tempo de atividade")
      .setDescription(
        `**${days}** dia(s), **${hours}** hora(s), **${minutes}** minuto(s), **${seconds}** segundo(s)`
      );

    return message.reply(uptimeR).catch(console.error);
  },
};
