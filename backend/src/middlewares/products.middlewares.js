const productsService = require('../services/products.service');

const { 
  HTTP_BAD_REQUEST_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS, HTTP_NOT_FOUND_STATUS,
} = require('../consts/httpStatusCodes');

const MIN_NAME_LENGTH = 5;

const validateProductName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: '"name" is required', 
    });
  }

  if (name.length < MIN_NAME_LENGTH) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json({ 
      message: '"name" length must be at least 5 characters long',
    });
  }

  next();
};

const productExistenceCheck = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.getById(id);
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }

  next();
};

module.exports = {
  validateProductName,
  productExistenceCheck,
};