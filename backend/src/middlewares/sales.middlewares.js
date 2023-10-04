const productsService = require('../services/products.service');

const { 
  HTTP_BAD_REQUEST_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS, HTTP_NOT_FOUND_STATUS,
} = require('../consts/httpStatusCodes');

const MIN_QUANTITY_NUMBER = 1;

const valueIsUndefined = (value) => typeof value === 'undefined' || value === null;

const paramsExistenceCheck = async (req, res, next) => {
  try {
    const salesProductsArray = req.body;

    const validations = salesProductsArray.map(async ({ productId, quantity }) => {
      if (valueIsUndefined(productId)) {
        throw new Error('"productId" is required');
      }

      if (valueIsUndefined(quantity)) {
        throw new Error('"quantity" is required');
      }
    });

    await Promise.all(validations);

    next();
  } catch ({ message }) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message });
  }
};

const quantityValidation = async (req, res, next) => {
  try {
    const salesProductsArray = req.body;

    const quantityValidations = salesProductsArray.map(async ({ quantity }) => {
      if (quantity < MIN_QUANTITY_NUMBER) {
        throw new Error('"quantity" must be greater than or equal to 1');
      }
    });

    await Promise.all(quantityValidations);

    next();
  } catch ({ message }) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json({ message });
  }
};

const productExistenceCheck = async (req, res, next) => {
  try {
    const salesProductsArray = req.body;

    const quantityValidations = salesProductsArray.map(async ({ productId }) => {
      await productsService.getById(productId);
    });

    await Promise.all(quantityValidations);

    next();
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
};

module.exports = {
  paramsExistenceCheck,
  quantityValidation,
  productExistenceCheck,
};