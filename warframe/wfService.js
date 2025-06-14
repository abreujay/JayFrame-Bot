const axios = require("axios");

async function getItem(itemName, originalMessage) {
  try {
    const responsePrice = await axios.get(
      `https://api.warframe.market/v1/items/${itemName}/orders`
    );
    const orders = responsePrice.data.payload.orders;

    const onlineSellOrders = orders.filter(
      (order) => order.user.status === "ingame" && order.order_type === "sell"
    );

    if (onlineSellOrders.length > 0) {
      const cheapestOrder = onlineSellOrders.sort((a, b) => a.platinum - b.platinum)[0];

      const itemPrice = cheapestOrder.platinum;
      const itemQuantity = cheapestOrder.quantity;
      const itemRank = cheapestOrder.mod_rank ?? "Not available";
      const seller = cheapestOrder.user.ingame_name;
      const status = cheapestOrder.user.status;

      // Mensagem de compra usando o texto original que o jogador enviou (originalMessage)
      const buyMessage = `Hi ${seller}, I'm interested in buying the item you have for sale: "${originalMessage}". Please let me know when you're available. Thanks!`;

      return {
        itemPrice,
        itemQuantity,
        itemRank,
        seller,
        status,
        buyMessage,
      };
    } else {
      return {
        message: "❌ No online sellers for this item right now.",
      };
    }
  } catch (error) {
    throw new Error("Error fetching item: " + error.message);
  }
}

module.exports = getItem;
