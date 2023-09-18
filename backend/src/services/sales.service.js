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
  const sale = await salesModel.getById(id);

  if (!sale) {
    throw new Error('Sale not found');
  }

  console.log(sale);

  const { sale_id: saleId, date, product_id: productId, quantity } = sale;

  return {
    saleId,
    date,
    productId,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
};