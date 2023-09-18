const { productsModel } = require('../models');

const getAll = () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

const registerProduct = async (productName) => productsModel.registerProduct(productName);

module.exports = {
  getAll,
  getById,
  registerProduct,
};