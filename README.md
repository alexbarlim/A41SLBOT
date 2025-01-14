# Music Bot em Node - PT-BR
## Instalação

Instale o Curl
```bash
sudo apt install curl
```
Instale o Node 16+
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```
Instale o NodeJS
```bash
sudo apt install -y nodejs
```
Instale o NPM
```bash
sudo apt install npm
```
Instale o GIT
```bash
sudo apt install git-all
```
Clone o repositório
```bash
git clone https://github.com/alexbarlim/musicbotnode
```
Entre na pasta e instale as dependências
```bash
npm ci --production
```

## Configurando

Renomei o arquivo `.env.example` para `.env` e preencha as APIs
⚠ Nunca compartilhe seus tokens ou chaves APIs publicamente 

```markdown
DISCORD_TOKEN=
YOUTUBE_API_KEY=
SOUNDCLOUD_CLIENT_ID=
ANNOUNCEMENTS_WEBHOOK_URL=
SPOTIFY_CLIENT_ID=
SPOTIFY_SECRET_ID=
```

Modifique o `config.json` e preencha os valores:

```md
{
  "PREFIX": "!",
  "MAX_PLAYLIST_SIZE": 500,
  "STAY_TIME": 300,
  "primaryColor": "#17d6d5",
  "errorColor": "#EF522F",
  "musicChannelOne": 514444518494568458,
  "musicChannelTwo": null,
  "welcomeChannel": "spawn-despawn",
  "goodbyeChannel": "spawn-despawn",
  "auditLogChannel": "🔑audit-log",
  "guildId": 463027132243771403,
  "memesChannelId": 769761743965782055,
  "memberCountChannelName": "member-count",
  "musicChannelErrorResponse": "⛔ Music commands are only available in **add-music** channel"
}
```

## Executando

Na pasta do bot, torne o `run.sh` executável
```bash
chmod +x run.sh
```
Crie um `.service` para iniciar junto com o sistema
```bash
sudo nano /etc/systemd/system/musicbot.service
```

### Opção 1

```md
[Unit]
Description=musicbot
After=network-online.target

[Service]
Restart=always
RestartSec=10
User=alex
ExecStart=/home/alex/musicbot/run.sh

[Install]
WantedBy=multi-user.target
```

### Opção 2
```md
[Unit]
Description=musicbot
After=network-online.target

[Service]
Restart=always
RestartSec=10
User=root
WorkingDirectory=/mnt/musicbotnode
ExecStart=npm start

[Install]
WantedBy=multi-user.target
```

Torne executável
```bash
sudo chmod +x /etc/systemd/system/musicbot.service
```
Inicie
```bash
systemctl daemon-reload; systemctl enable musicbot; systemctl start musicbot
```
<br />
<br />
<br />
<br />
<br />

# ORIGINAL

<div align="center">
<img src="https://media.giphy.com/media/kU0et9AnjV2PrWTkS7/giphy.gif" width="500" align="center" />
  
<bold><h1>All For One Bot</h1></bold>
</div>

All For One Bot is an open source solution for your discord server management and entertainment. My goal is to cover as many functionalities and niches as possible, while still maintaining usability and code readability. Currently the bot can stream music from YouTube, SoundCloud and Spotify.

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/BlazeIsClone/A41SLBOT/commits/master)
[![Generic badge](https://img.shields.io/badge/Instructions-wiki-<COLOR>.svg)](https://github.com/BlazeIsClone/A41SLBOT/wiki/)
[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](https://github.com/BlazeIsClone/A41SLBOT/blob/master/LICENSE.txt)

<hr>

## 📥 Installation

For self hosting clone this repository

```bash
git clone https://github.com/BlazeIsClone/A41SLBOT.git
```


## ⚙️ Configuration

⚠ Never share your tokens or api keys publicly 

Modify `config.json` and fill out the values:

```md
{
  "PREFIX": "/",
  "MAX_PLAYLIST_SIZE": 500,
  "STAY_TIME": 300,
  "primaryColor": "#17d6d5",
  "errorColor": "#EF522F",
  "musicChannelOne": text-channel-id,
  "musicChannelTwo": null,
  "welcomeChannel": "text-channel-name",
  "goodbyeChannel": "text-channel-name",
  "auditLogChannel": "text-channel-name",
  "guildId": server-id,
  "memesChannelId": text-channel-id,
  "memberCountChannelName": "text-channel-name",
  "musicChannelErrorResponse": "⛔ Music commands are only available in **add-music** channel"
}

```
For API Tokens Rename `.env.example` to `.env` and fill out the values:

```markdown
DISCORD_TOKEN=
YOUTUBE_API_KEY=
SOUNDCLOUD_CLIENT_ID=
ANNOUNCEMENTS_WEBHOOK_URL=
SPOTIFY_CLIENT_ID=
SPOTIFY_SECRET_ID=
```
If you have any difficulties obtaining API tokens please refer
[📄 wiki](https://github.com/BlazeIsClone/A41SLBOT/wiki)

For Heroku hosting use the **config vars** feature.

## 👏 Contributor Covenant Code of Conduct

This project is currently under development and if you are planing to implement right now you might have to make minor adjustments to the code. In the future im planing to make intergration seamless and provide detailed documentation. If You run into any issues please feel free to let me know in the discussion or create a new issue.

All For One Bot is still on alpha stage contribution would be appreciated ❤️.

## ✉️ Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see
https://www.contributor-covenant.org/faq

## 💝 Credits
A special thanks to [eritislami/evobot](https://github.com/eritislami/evobot) for the music system/technology and [SharkSmile](https://github.com/sahaswin) for the amazing logo and inspiration.

## 📜 License [![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](https://github.com/BlazeIsClone/A41SLBOT/blob/master/LICENSE.txt)

[📄 GNU General Public License v3.0](https://github.com/BlazeIsClone/A41SLBOT/blob/master/LICENSE.txt)

