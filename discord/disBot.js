const { Client, GatewayIntentBits } = require("discord.js");
const getItem = require("../warframe/wfService");
require('dotenv').config();

function discBot() {
  const discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  const DISCORD_TOKEN = process.env.DISC_TOKEN;

  if (!DISCORD_TOKEN) {
    console.error("⚠️ Discord token not found! Please set DISC_TOKEN in your .env file.");
    return;
  }

  discordClient.once("ready", () => {
    console.log(`Discord bot logged in as ${discordClient.user.tag}`);
  });

  discordClient.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("/market")) {
      const itemNameRaw = message.content.replace("/market", "").trim();
      const formattedItemName = itemNameRaw.toLowerCase().replace(/ /g, '_');

      if (!itemNameRaw) {
        await message.channel.send(
          "❌ Please type the item name after the command.\nExample: `/market soma`"
        );
        return;
      }

      try {
        const itemData = await getItem(formattedItemName, itemNameRaw);

        if (itemData.buyMessage) {
          await message.channel.send(
            `💰 **Lowest Price:** ${itemData.itemPrice} platinum\n` +
            `📦 **Quantity:** ${itemData.itemQuantity}\n` +
            `🎚️ **Rank:** ${itemData.itemRank}\n` +
            `👤 **Seller:** ${itemData.seller}\n` +
            `🟢 **Status:** Online\n\n` +
            `💬 **Suggested purchase message:**\n\`${itemData.buyMessage}\``
          );
        } else {
          await message.channel.send(itemData.message || `❌ Could not find the item **${itemNameRaw}** or no online sellers at the moment.`);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
        await message.channel.send(
          "❌ An error occurred while fetching the item. Please try again later."
        );
      }
    }
  });

  process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
  });

  discordClient.login(DISCORD_TOKEN);
}

module.exports = discBot;
