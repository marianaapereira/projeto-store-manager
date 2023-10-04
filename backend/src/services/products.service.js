const { productsModel } = require('../models');

const getAll = () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

const registerProduct = async (name) => productsModel.registerProduct(name);

const updateProduct = async (product) => {
  const updatedProduct = productsModel.updateProduct(product);

  if (!updatedProduct) {
    throw new Error('Product not found');
  }

  return updatedProduct;
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
  deleteProduct,
};