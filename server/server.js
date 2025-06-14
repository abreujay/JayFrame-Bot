const express = require("express");
const axios = require("axios");
const getItem = require("../warframe/wfService");

const discBot = require('../discord/disBot')
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {

  console.log(`Servidor Rodando na Porta ${PORT}`);
  console.log('Bot Iniciados!')

  discBot();

});
