const Discord = require("discord.js");
const webhook = require("webhook-discord");
const { PREFIX } = require("../../../config.json");
require("dotenv").config();
var webhookUrl = process.env.ANNOUNCEMENTS_WEBHOOK_URL;
webhookUrl += "/";
const res = webhookUrl.match("https://.+/api/webhooks/([^/]+)/([^/]+)/");

module.exports = {
  name: "anunciar",
  description: "Envia um anúncio",
  async execute(message, args) {
    const webhookID = res[1];
    const webhookToken = res[2];

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("Você não tem permissão para fazer isso");
    const webhookClient = new Discord.WebhookClient(webhookID, webhookToken);
    args = message.content.slice(9).trim();
    var announcement = "";
    for (const word in args) {
      announcement = args;
    }
    webhookClient.send(announcement).catch(console.error);
  },
};
