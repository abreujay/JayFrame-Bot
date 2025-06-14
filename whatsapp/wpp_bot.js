const wa = require('@open-wa/wa-automate');
const getItem = require('../warframe/wfService');

function wppBot() {
  wa.create({
    sessionId: 'Warframe Bot',
  })
    .then((client) => {
      console.log('✅ WhatsApp client started successfully!');
      start(client);
    })
    .catch((err) => {
      console.error('❌ Error creating WhatsApp session:', err);
    });

  function start(client) {
    client.onMessage(async (message) => {
      const userId = message.from;
      const text = message.body && message.body.trim();

      console.log(`📩 Message received from ${userId}: ${text}`);

      if (text.toLowerCase().startsWith('/market ')) {
        const itemNameRaw = text.substring(8).trim();
        const formattedItemName = itemNameRaw.toLowerCase().replace(/ /g, '_');

        if (!itemNameRaw) {
          await client.sendText(userId, '❌ Please provide the item name after the command.');
          return;
        }

        await client.sendText(userId, `🔎 Searching information for item: *${itemNameRaw}*...`);

        try {
          const itemData = await getItem(formattedItemName, itemNameRaw);

          if (itemData.buyMessage) {
            await client.sendText(
              userId,
              `💰 *Lowest Price:* ${itemData.itemPrice} platinum\n` +
              `📦 *Quantity:* ${itemData.itemQuantity}\n` +
              `🎚️ *Rank:* ${itemData.itemRank}\n` +
              `👤 *Seller:* ${itemData.seller}\n` +
              `🟢 *Status:* Online\n\n` +
              `💬 *Suggested purchase message:*\n\`${itemData.buyMessage}\``
            );
          } else {
            await client.sendText(userId, itemData.message || `❌ Could not find the item *${itemNameRaw}* or no online sellers right now.`);
          }
        } catch (error) {
          console.error('Error fetching item:', error);
          await client.sendText(userId, `❌ Error searching for the item: ${error.message}`);
        }
      }
    });
  }
}

module.exports = wppBot;
