const productsService = require('../services/products.service');

const { 
  HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS,
} = require('../consts/http-status-codes');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  return res.status(HTTP_OK_STATUS).json(products);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return res.status(HTTP_OK_STATUS).json(product);
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
};

module.exports = {
  getAll,
  getById,
};