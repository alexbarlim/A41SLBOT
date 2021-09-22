const { MessageEmbed } = require("discord.js");
const {
  musicChannelOne,
  musicChannelTwo,
  musicChannelErrorResponse,
  primaryColor,
  errorColor,
} = require("../../../config.json");

module.exports = {
  name: "queue",
  cooldown: 60,
  aliases: ["q"],
  description: "Mostra a fila de músicas e o que está tocando.",
  async execute(message) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }
    const permissions = message.channel.permissionsFor(message.client.user);
    if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
      return message.reply(
        "Permissão ausente para gerenciar mensagens ou adicionar reações"
      );

    const queue = message.client.queue.get(message.guild.id);

    const emptyQueue = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Fila vazia")
      .setDescription("Não há nada tocando neste servidor");

    if (!queue) return message.channel.send(emptyQueue);

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);

    const queueEmbed = await message.channel.send(
      `**Página atual - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["⬅️", "➡️"].includes(reaction.emoji.name) &&
      message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, {
      time: 60000,
    });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(
              `**Página atual - ${currentPage + 1}/${embeds.length}**`,
              embeds[currentPage]
            );
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(
              `**Página atual - ${currentPage + 1}/${embeds.length}**`,
              embeds[currentPage]
            );
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });
  },
};

var generateQueueEmbed = (message, queue) => {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current
      .map((track) => `\`${++j}\` [${track.title}](${track.url})`)
      .join("\n");

    const embed = new MessageEmbed()
      .setTitle("Fila de músicas\n")
      .setThumbnail(message.guild.iconURL())
      .setColor(primaryColor)
      .setDescription(
        `**Música atual - [${queue[0].title}](${queue[0].url})**\n\n${info}`
      );
    embeds.push(embed);
  }

  return embeds;
};
