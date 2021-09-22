const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const {
  musicChannelOne,
  musicChannelTwo,
  musicChannelErrorResponse,
  primaryColor,
  errorColor,
} = require("../../../config.json");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Obtenha a letra da música que está tocando",
  async execute(message) {
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

    if (!queue) return message.channel.send(emptyQueue);
    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Nehuma letra encontrada de ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `Nenhuma letra encontrada de ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`${queue.songs[0].title} — Lyrics`)
      .setDescription(lyrics)
      .setColor(primaryColor);

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  },
};
