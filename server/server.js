const express = require("express");
const axios = require("axios");
const getItem = require("../warframe/wfService");

const wppBot = require('../whatsapp/wpp_bot')
const discBot = require('../discord/disBot')

const wa = require("@open-wa/wa-automate");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {

  console.log(`Servidor Rodando na Porta ${PORT}`);
  console.log('Bot Iniciados!')

  discBot();

});
