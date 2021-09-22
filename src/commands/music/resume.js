const { canModifyQueue } = require("../../util/Util");
const { MessageEmbed } = require("discord.js");
const {
  musicChannelOne,
  musicChannelTwo,
  musicChannelErrorResponse,
  primaryColor,
  errorColor,
} = require("../../../config.json");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Retomar a música atual",
  execute(message) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }
    const queue = message.client.queue.get(message.guild.id);
    const nothingPlaying = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Erro!")
      .setDescription(`Não há nada tocando`);

    if (!queue) return message.reply(nothingPlaying).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      const resumed = new MessageEmbed()
        .setColor(primaryColor)
        .setTitle("Retomado")
        .setDescription(`${message.author} ▶ retomou a música`);

      return queue.textChannel.send(resumed).catch(console.error);
    }

    return message.reply("A fila não está pausada.").catch(console.error);
    const notPaused = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Error!")
      .setDescription(`A música/fila não está pausada`);

    return message.reply(notPaused).catch(console.error);
  },
};
