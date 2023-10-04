const productsService = require('../services/products.service');

const { 
  HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_NO_CONTENT_STATUS,
} = require('../consts/httpStatusCodes');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(HTTP_OK_STATUS).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  return res.status(HTTP_OK_STATUS).json(product);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const registeredProduct = await productsService.registerProduct(name);

  return res.status(HTTP_CREATED_STATUS).json(registeredProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const productToUpdate = await productsService.getById(id);
  const product = { ...productToUpdate, name };
  const updatedProduct = await productsService.updateProduct(product);

  return res.status(HTTP_OK_STATUS).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsService.deleteProduct(id);

  return res.status(HTTP_NO_CONTENT_STATUS).json();
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
  deleteProduct,
};