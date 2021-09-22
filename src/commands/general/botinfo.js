const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { primaryColor } = require("../../../config.json");
const os = require("os");

module.exports = {
  name: "botinfo",
  description: "Status do servidor bot",
  async execute(message, args) {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    const guildID = message.guild.name;
    const statsEmbed = new Discord.MessageEmbed()
      .setColor(primaryColor)
      .setThumbnail(message.client.user.avatarURL())
      .setFooter(
        message.client.user.username,
        message.client.user.displayAvatarURL()
      )
      .addField(`Sistema Operacional`, `${os.platform()}`, false)
      .addField(`Arquitetura`, `${os.arch()}`, false)
      .addField(`Processador`, `${os.cpus().map((i) => `${i.model}`)[0]}`, false)
      .addField(
        `Memória RAM`,
        `${Math.trunc(
          process.memoryUsage().heapUsed / 1024 / 1000
        )} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round(
          (Math.round(process.memoryUsage().heapUsed / 1024 / 1024) /
            Math.round(os.totalmem() / 1024 / 1024)) *
            100
        )}%)`,
        false
      )
      .addField(
        `Tempo de funcionamento do servidor`,
        "" +
          `${days} days, ${hours} hours,${minutes} minutes, ${seconds} seconds` +
          "",
        false
      )

      .addField(`Biblioteca`, `Discord.js ${Discord.version}`, false)
      .addField(
        "Contribuinte",
        `https://github.com/alexbarlim/musicbotnode`,
        false
      );

    message.reply(statsEmbed).catch(console.error);
  },
};
