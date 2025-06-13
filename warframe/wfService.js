const axios = require("axios");

async function getItem(itemName) {
  try {
    const responseItem = await axios.get(
      `https://api.warframe.market/v1/items/${itemName}`
    );
    const itemData = responseItem.data.payload.item.items_in_set[0];

    const nome = itemData.pt?.item_name || "Nome não disponível";
    const desc = itemData.pt?.description || "Sem descrição";

    const responsePrice = await axios.get(
      `https://api.warframe.market/v1/items/${itemName}/orders`
    );
    const orders = responsePrice.data.payload.orders;

    if (orders.length > 0) {
      const firstOrder = orders[0];
      const itemPrice = firstOrder.platinum;
      const itemQuantity = firstOrder.quantity;
      const itemRank = firstOrder.mod_rank || "Não disponível";

      return {
        nome,
        desc,
        itemPrice,
        itemQuantity,
        itemRank,
      };
    } else {
      return {
        nome,
        desc,
        message: "Nenhuma ordem encontrada para este item.",
      };
    }
  } catch (error) {
    throw new Error("Erro ao localizar item: " + error.message);
  }
}

module.exports = getItem;
