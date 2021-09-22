const { MessageEmbed } = require("discord.js");
const { play } = require("../../include/play");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default;
const ytsr = require("ytsr");
const { getTracks } = require("spotify-url-info");
const {
  musicChannelOne,
  musicChannelTwo,
  musicChannelErrorResponse,
  primaryColor,
  errorColor,
} = require("../../../config.json");

let config;
try {
  config = require("../../../config.json");
} catch (error) {
  config = null;
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const MAX_PLAYLIST_SIZE = config
  ? config.MAX_PLAYLIST_SIZE
  : process.env.MAX_PLAYLIST_SIZE;

const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "playlist",
  cooldown: 5,
  aliases: ["pl"],
  description: "Toque uma lista de reprodução ou um álbum",
  async execute(message, args) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }
    const { channel } = message.member.voice;
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!args.length) {
      const pl = new MessageEmbed()
        .setColor(errorColor)
        .setTitle("Uso")
        .setDescription(
          `${message.client.prefix}playlist <YouTube Playlist URL | Playlist Name>`
        );

      return message.reply(pl).catch(console.error);
    }
    if (!channel)
      return message
        .reply("Você precisa entrar em um canal de voz primeiro!")
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
      const nullVC = new MessageEmbed()
        .setColor(errorColor)
        .setTitle("Erro!")
        .setDescription("Não é possível conectar ao canal de voz, permissões ausentes");

      return message.reply(nullVC);
    }
    if (!permissions.has("SPEAK")) {
      const errVC = new MessageEmbed()
        .setColor(errorColor)
        .setTitle("Erro no canal de voz")
        .setDescription(
          "Não posso falar neste canal de voz, certifique-se de que tenho as permissões adequadas"
        );

      return message.reply(errVC);
    }
    if (serverQueue && channel !== message.guild.me.voice.channel) {
      const sameVcErr = new MessageEmbed()
        .setColor(errorColor)
        .setTitle("Erro!")
        .setDescription(
          `Você deve estar no mesmo canal que ${message.client.user}`
        );

      return message.reply(sameVcErr).catch(console.error);
    }

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const spotifyPlaylistPattern =
      /^.*(https:\/\/open\.spotify\.com\/playlist)([^#\&\?]*).*/gi;
    const spotifyPlaylistValid = spotifyPlaylistPattern.test(args[0]);
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true,
    };

    let song = null;
    let playlist = null;
    let videos = [];

    if (spotifyPlaylistValid) {
      try {
        waitMessage = await message.channel.send(
          new MessageEmbed()
            .setDescription("⏳ buscando lista de reprodução...")
            .setColor(primaryColor)
        );
        let playlistTrack = await getTracks(url);
        if (playlistTrack > MAX_PLAYLIST_SIZE) {
          playlistTrack.length = MAX_PLAYLIST_SIZE;
        }
        const spotfiyPl = await Promise.all(
          playlistTrack.map(async (track) => {
            let result;
            const ytsrResult = await ytsr(
              `${track.name} - ${track.artists ? track.artists[0].name : ""}`,
              { limit: 1 }
            );
            result = ytsrResult.items[0];
            return (song = {
              title: result.title,
              url: result.url,
              duration: result.duration
                ? this.convert(result.duration)
                : undefined,
              thumbnail: result.thumbnails
                ? result.thumbnails[0].url
                : undefined,
            });
          })
        );
        const result = await Promise.all(
          spotfiyPl.filter(
            (song) => song.title != undefined || song.duration != undefined
          )
        );
        videos = result;
      } catch (err) {
        console.log(err);
        return message.channel.send(err ? err.message : "There was an error!");
      }
    } else if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url, { part: "snippet" });
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, {
          part: "snippet",
        });
      } catch (error) {
        console.error(error);

        const playlistNotFound = new MessageEmbed()
          .setColor(errorColor)
          .setTitle("Não encontrado")
          .setDescription("Playlist não encontrada");
        return message.reply(playlistNotFound);
      }
    } else if (scdl.isValidUrl(args[0])) {
      if (args[0].includes("/sets/")) {
        message.channel.send("⌛ buscando a lista de reprodução...");
        playlist = await scdl.getSetInfo(args[0], SOUNDCLOUD_CLIENT_ID);
        videos = playlist.tracks.map((track) => ({
          title: track.title,
          url: track.permalink_url,
          thumbnail: `https://i1.sndcdn.com/avatars-wQ2we7uDPoXzUVzW-qdr1Yg-t500x500.jpg`,
          duration: track.duration / 1000,
        }));
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1, {
          part: "snippet",
        });
        playlist = results[0];
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, {
          part: "snippet",
        });
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }
    const newSongs = videos
      .filter((video) => video.title != "Private video")
      .map((video) => {
        return (song = {
          title: video.title,
          url: video.url,
          duration: video.durationSeconds,
          thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
          user: message.author,
        });
      });

    serverQueue
      ? serverQueue.songs.push(...newSongs)
      : queueConstruct.songs.push(...newSongs);

    let playlistEmbed = new MessageEmbed()
      .setTitle("Lista de reprodução adicionada")
      .setDescription(
        newSongs.map((song, index) => `\`${index + 1}\` ${song.title}`)
      )
      .setURL(song.url)
      .setThumbnail(song.thumbnail)
      .setColor(primaryColor);

    if (playlistEmbed.description.length >= 2048)
      playlistEmbed.description =
        playlistEmbed.description.substr(0, 2007) +
        "\nPlaylist maior que o limite de caracteres...";

    message.channel.send(`${message.author} iniciou uma lista de reprodução`, playlistEmbed);

    if (!serverQueue) {
      message.client.queue.set(message.guild.id, queueConstruct);

      try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        await channel.leave();

        const unableJoinVC = new MessageEmbed()
          .setColor(errorColor)
          .setTitle("Erro!")
          .setDescription(`Não foi possível entrar no canal: ${error.message}`);

        return message.channel.send(unableJoinVC).catch(console.error);
      }
    }
  },

  convert(second) {
    const a = second.split(":");
    let rre;
    if (a.length == 2) {
      rre = a[0] * 60 + a[1];
    } else {
      rre = a[0] * 60 * 60 + a[1] * 60 + a[2];
    }

    return rre;
  },
};
