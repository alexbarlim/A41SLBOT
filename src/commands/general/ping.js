const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Pings para o servidor",
    async execute(message, args) {
        const msg = await message.channel.send("Ping?");
        msg.edit(
            `:ping_pong: **Pong!** retornou \`${
                msg.createdTimestamp - message.createdTimestamp
            }ms\``
        );
    },
};
