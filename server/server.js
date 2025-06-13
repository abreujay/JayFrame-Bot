const express = require("express");
const axios = require("axios");
const getItem = require("../warframe/wfService");

const wa = require("@open-wa/wa-automate");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const userStates = {}; //guardar estado do usuário

app.listen(PORT, () => {
  console.log(`Servidor Rodando na Porta ${PORT}`);

  wa.create({
    sessionId: "Warframe Bot",
  })
    .then((client) => {
      console.log("WhatsApp client iniciado com sucesso!");
      start(client);
    })
    .catch((err) => {
      console.error("Erro ao criar sessão do WhatsApp:", err);
    });
});

function start(client) {
  client.onMessage(async (message) => {
    const userId = message.from; // identificador do usuário (número)
    const text = message.body && message.body.trim().toLowerCase();

    console.log("Mensagem recebida:", text);

    if (text === "/market") {
      userStates[userId] = "aguardando_nome_item"; // define estado do usuário
      await client.sendText(userId, "Olá! Digite Abaixo o Nome do Item:");
      return;
    }

    // Se estiver aguardando o nome do item, pega o texto da mensagem e processa
    if (userStates[userId] === "aguardando_nome_item") {
      const itemName = message.body.trim();
      const formatedItemName = itemName.toLowerCase().replace(/ /g, "_");

      await client.sendText(
        userId,
        `Você digitou: ${itemName}. Agora vou buscar os dados...`
      );

      try {
        const itemData = await getItem(formatedItemName); // adapte o getItem para retornar dados

        await client.sendText(
          userId,
          `Nome: ${formatedItemName} \n Preço: ${itemData.itemPrice} \n Quantidade: ${itemData.itemQuantity} \n Rank: ${itemData.itemRank}`
        );
      } catch (error) {
        await client.sendText(
          userId,
          `Erro ao buscar o item: ${error.message}`
        );
      }

      // Depois que processar, limpa o estado para esperar outro comando
      delete userStates[userId];
      return;
    }

    // Outras mensagens ou estados podem ser tratados aqui...
  });
}
