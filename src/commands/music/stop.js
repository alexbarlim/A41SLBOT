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
  name: "stop",
  aliases: ["clear"],
  description: "Para as músicas",
  execute(message) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }
    const queue = message.client.queue.get(message.guild.id);

    const embedA = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Fila vazia")
      .setDescription("Não há nada na fila");

    if (!queue) return message.reply(embedA).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();

    const embedB = new MessageEmbed()
      .setColor(primaryColor)
      .setTitle("Parada!")
      .setDescription(`**${message.author}** parou a música`);

    queue.textChannel.send(embedB).catch(console.error);
  },
};
