require("array.prototype.move");
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
  name: "move",
  aliases: ["mv"],
  description: "Mova músicas para o topo da fila",
  execute(message, args) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }

    const queue = message.client.queue.get(message.guild.id);
    const noQue = new MessageEmbed()
      .setColor(errorColor)
      .setDescription("Não há fila para mover");

    if (!queue) return message.channel.send(noQue).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    const errThrow = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Move")
      .setDescription(`Use: ${message.client.prefix}move <Queue Number>`);

    if (!args.length || isNaN(args[0]))
      return message.reply(errThrow).catch(console.error);

    let songMoved = queue.songs[args[0] - 1];

    queue.songs.move(args[0] - 1, 1);
    const moveQueue = new MessageEmbed()
      .setColor(primaryColor)
      .setTitle("Move")
      .setDescription(
        `${message.author} 📤 moveu **${songMoved.title}** para o topo da fila.`
      );

    queue.textChannel.send(moveQueue).catch(console.error);
  },
};
