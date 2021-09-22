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
  name: "loop",
  aliases: ["l"],
  description: "Ativa o loop na música",
  execute(message) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }

    const queue = message.client.queue.get(message.guild.id);

    const emptyQueue = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Fila vazia")
      .setDescription("Não há nada tocando");

    if (!queue) return message.reply(emptyQueue);
    if (!canModifyQueue(message.member)) return;

    queue.loop = !queue.loop;
    const loop = new MessageEmbed()
      .setColor(primaryColor)
      .setTitle("Loop")
      .setDescription(
        `Loop agora está definido para ${queue.loop ? "**ligado**" : "**desligado**"}`
      );
    return queue.textChannel.send(loop);
  },
};
