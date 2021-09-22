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
  name: "remove",
  description: "Remove músicas da fila",
  execute(message, args) {
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
      .setDescription("Não há nada na fila");

    if (!queue) return message.channel.send(emptyQueue).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    const noArgs = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Uso")
      .setDescription(`${message.client.prefix}remove <Queue Number>`);

    const NaNer = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Uso")
      .setDescription(`${message.client.prefix}remove <Queue Number>`);

    if (!args.length) return message.reply(noArgs);
    if (isNaN(args[0])) return message.reply(NaNer);

    const song = queue.songs.splice(args[0] - 1, 1);

    const remov = new MessageEmbed()
      .setColor(primaryColor)
      .setTitle("Música removida da fila")
      .setDescription(
        `${message.author} removeu **${song[0].title}** da fila`
      );

    queue.textChannel.send(remov);
  },
};
