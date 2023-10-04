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

const registerSale = async (saleProducts) => { 
  const createdSale = await salesModel.registerSale(saleProducts);

  const itemsSold = createdSale.itemsSold.map(({ product_id: productId, quantity }) => ({
    productId,
    quantity,
  }));

  const newSale = { ...createdSale, itemsSold };

  return newSale;
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
};

const updateProductQuantity = async (saleIdParam, productIdParam, newQuantity) => {
  const returnedUpdatedProduct = await salesModel
    .updateProductQuantity(saleIdParam, productIdParam, newQuantity);

  const { 
    date, quantity, sale_id: saleId, product_id: productId, 
  } = returnedUpdatedProduct;

  const updatedSaleProduct = {
    date,
    productId,
    quantity,
    saleId,
  };

  return updatedSaleProduct;
};

module.exports = {
  getAll,
  getById,
  registerSale,
  deleteSale,
  updateProductQuantity,
};