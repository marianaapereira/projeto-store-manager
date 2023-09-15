const productsModel = require('../models/products.model');

const getAll = () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

module.exports = {
  getAll,
  getById,
};