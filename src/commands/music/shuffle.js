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
    name: "shuffle",
    description: "Fila aleatória",
    execute(message) {
        if (
            message.channel.id != musicChannelOne &&
            message.channel.id != musicChannelTwo
        ) {
            return message.author.send(musicChannelErrorResponse);
        }
        const queue = message.client.queue.get(message.guild.id);

        const noQ = new MessageEmbed()
            .setColor(errorColor)
            .setTitle("Fila vazia")
            .setDescription(`Não há nada na fila`);

        if (!queue) return message.channel.send(noQ).catch(console.error);
        if (!canModifyQueue(message.member)) return;

        let songs = queue.songs;
        for (let i = songs.length - 1; i > 1; i--) {
            let j = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[j]] = [songs[j], songs[i]];
        }
        queue.songs = songs;
        message.client.queue.set(message.guild.id, queue);
        const shuffled = new MessageEmbed()
            .setColor(primaryColor)
            .setTitle("Embaralhada")
            .setDescription(`${message.author} embaralhou a fila`);

        queue.textChannel.send(shuffled).catch(console.error);
    },
};
