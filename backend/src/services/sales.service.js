const { salesModel } = require('../models');

const getAll = async () => {
  const salesArray = await salesModel.getAll();

  const sales = salesArray
    .map(({ sale_id: saleId, date, product_id: productId, quantity }) => ({
        saleId,
        date,
        productId,
        quantity,
      }));

  return sales;
};

const getById = async (id) => {
  const saleItemsArray = await salesModel.getById(id);

  if (!saleItemsArray || saleItemsArray.length === 0) {
    throw new Error('Sale not found');
  }

  const saleItems = saleItemsArray
  .map(({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }));

  return saleItems;
};

const registerSale = async (saleProducts) => salesModel.registerSale(saleProducts);

module.exports = {
  getAll,
  getById,
  registerSale,
};