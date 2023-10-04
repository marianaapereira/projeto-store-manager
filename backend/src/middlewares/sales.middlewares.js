const productsService = require('../services/products.service');
const salesService = require('../services/sales.service');

const { 
  HTTP_BAD_REQUEST_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS, HTTP_NOT_FOUND_STATUS,
} = require('../consts/httpStatusCodes');

const MIN_QUANTITY_NUMBER = 1;

const valueIsUndefined = (value) => typeof value === 'undefined' || value === null;

const productIdExistenceCheck = (productId) => {
  if (valueIsUndefined(productId)) {
    throw new Error('"productId" is required');
  }
};

const quantityExistenceCheck = (quantity) => {
  if (valueIsUndefined(quantity)) {
    throw new Error('"quantity" is required');
  }
};

const quantityValueCheck = (quantity) => {
  if (quantity < MIN_QUANTITY_NUMBER) {
    throw new Error('"quantity" must be greater than or equal to 1');
  }
};

const paramsValidations = async (req, res, next) => {
  const saleProductsArray = req.body;

  try {
    const validations = saleProductsArray.map(async ({ productId, quantity }) => {
      productIdExistenceCheck(productId);
      quantityExistenceCheck(quantity);
    });

    await Promise.all(validations);
  } catch ({ message }) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message });
  }

  try {
    const validations = saleProductsArray.map(async ({ quantity }) => quantityValueCheck(quantity));

    await Promise.all(validations);
  } catch ({ message }) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json({ message });
  }

  next();
};

const productsExistenceCheck = async (req, res, next) => {
  try {
    const salesProductsArray = req.body;

    const validations = salesProductsArray.map(async ({ productId }) => {
      await productsService.getById(productId);
    });

    await Promise.all(validations);

    next();
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
};

const saleExistenceCheck = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.getById(id);
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }

  next();
};

const quantityValidations = async (req, res, next) => {
  const { quantity } = req.body;

  try {
    quantityExistenceCheck(quantity);
  } catch ({ message }) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message });
  }

  try {
    quantityValueCheck(quantity);
  } catch ({ message }) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json({ message });
  }

  next();
};

const productInSaleValidation = async (req, res, next) => {
  const { productId, saleId } = req.params;

  try {
    const saleProducts = await salesService.getById(saleId);

    if (valueIsUndefined(saleProducts)) {
      throw new Error('Sale not found');
    }

    const getProductInSale = saleProducts.find((saleProduct) => 
      saleProduct.productId === Number(productId));

    if (valueIsUndefined(getProductInSale)) {
      throw new Error('Product not found in sale');
    }
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
  
  next();
};

module.exports = {
  paramsValidations,
  productsExistenceCheck,
  saleExistenceCheck,
  quantityValidations,
  productInSaleValidation,
};