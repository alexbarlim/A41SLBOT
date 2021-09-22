const Discord = require("discord.js");

module.exports = {
        name: "restart",
        description: "Reinicia o bot",
        async execute(message, args) {
                const resMsg = ` \`\`\`md\nReiniciando o bot...\nIsso pode levar até um minuto\`\`\``;
                if (!message.member.hasPermission("ADMINISTRATOR"))
                        return message.reply(
                                "Você não tem permissão para fazer isso"
                        );

                (async () => {
                        await message.channel.send(resMsg);
                        try {
                                process.exit();
                        } catch (err) {
                                console.log(err);
                        }
                })();
        },
};
