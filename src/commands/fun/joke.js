const DadJokes = require("dadjokes-wrapper");
module.exports = {
        name: "joke",
        aliases: ["jk"],
        description: "Piadas aleatórias",
        async execute(message, args) {
                if (!message.member.hasPermission("SEND_MESSAGES"))
                        return message.reply(
                                "Você não tem permissão para enviar mensagens neste canal"
                        );

                const joke = new DadJokes();
                const dadjoke = await joke.randomJoke();
                message.reply(dadjoke).catch(console.error);
        },
};
