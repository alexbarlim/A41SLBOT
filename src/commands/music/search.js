const { MessageEmbed } = require("discord.js");
const YouTubeAPI = require("simple-youtube-api");
const {
  musicChannelOne,
  musicChannelTwo,
  musicChannelErrorResponse,
  primaryColor,
  errorColor,
} = require("../../../config.json");

let YOUTUBE_API_KEY;
try {
  const config = require("../config.json");
  YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
} catch (error) {
  YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
}
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "search",
  description: "Pesquise e selecione vídeos para reproduzir",
  async execute(message, args) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }

    const incUsage = new MessageEmbed()
      .setTitle(`Pesquisar músicas`)
      .setDescription(
        `Uso: ${message.client.prefix}${module.exports.name} <Video Name>`
      )
      .setColor(errorColor);
    const errMsgCollector = new MessageEmbed()
      .setTitle(`Procurar`)
      .setDescription("Um coletor de mensagens já está ativo neste canal.")
      .setColor(errorColor);

    if (!args.length) return message.reply(incUsage).catch(console.error);
    if (message.channel.activeCollector)
      return message.reply(errMsgCollector).catch(console.error);
    if (!message.member.voice.channel)
      return message
        .reply("Você precisa entrar em um canal de voz primeiro!")
        .catch(console.error);

    const search = args.join(" ");

    let resultsEmbed = new MessageEmbed()
      .setTitle(`**Responda com o número da música que deseja tocar**`)
      .setDescription(`Resultados para: ${search}`)
      .setColor(primaryColor);

    const results = await youtube.searchVideos(search, 10);

    const noResults = new MessageEmbed()
      .setDescription("Nenhum resultado encontrado para essa pesquisa!")
      .setColor(errorColor);

    if (!results.length)
      return message.channel.send(noResults).catch(console.error);
    results.forEach((video, index) =>
      resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`)
    );

    const resultsMessage = await message.channel.send(resultsEmbed);
    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    emojis.forEach(async (e) => await resultsMessage.react(e).catch(() => {}));
    const filter = (reaction, user) =>
      user.id === message.author.id && emojis.includes(reaction.emoji.name);

    message.channel.activeCollector = true;
    const response = await resultsMessage.awaitReactions(filter, {
      max: 1,
      time: 60000,
    });

    if (!response.first()) {
      message.channel.activeCollector = false;
      return message.channel.send(
        "Limite de tempo excedido, a pesquisa foi cancelada."
      );
    }
    const choice =
      results[parseInt(emojis.indexOf(response.first().emoji.name))].url;

    message.channel.activeCollector = false;
    message.client.commands.get("play").execute(message, [choice]);
    resultsMessage.delete().catch(() => {});
  },
};
