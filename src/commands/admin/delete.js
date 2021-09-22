const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { PREFIX, primaryColor } = require("../../../config.json");

module.exports = {
  name: "delete",
  description: "Excluir mensagens de bate-papo",
  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("You do not have the permissions to do that");

    const amount = parseInt(args[0]) + 1;
    const exRes = new MessageEmbed()
      .setColor(primaryColor)
      .setTitle("Comando de deletar")
      .setDescription(`Use: ${PREFIX}delete <number>`);

    if (isNaN(amount)) {
      return message.reply(exRes);
    } else if (amount <= 1 || amount > 100) {
      return message.reply("você precisa inserir um número entre 1 e 99.");
    }

    (async () => {
      try {
        message.channel.bulkDelete(amount, true).catch((err) => {
          console.error(err);
          message.channel.send(
            ":warning: Devido às regras do Discord, os bots só podem excluir mensagens em massa com menos de 14 dias."
          );
        });
        message
          .reply(`🗑️ eu deletei \`${amount - 1}\`  mensagens para você`)
          .then((msg) => {
            msg
              .delete({
                timeout: 5000,
              })
              .catch(console.error);
          })
          .catch(console.error);
      } catch (err) {
        console.log(err);
      }
    })();
  },
};
