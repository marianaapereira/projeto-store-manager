const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products.controller');
const productsMiddlewares = require('../middlewares/products.middlewares');

// rotas /products

router.get(
  '/',
  productsController.getAll,
);

router.post(
  '/',
  productsMiddlewares.validateProductName,

  productsController.registerProduct,
);

router.get(
  '/:id',
  productsMiddlewares.productExistenceCheck,

  productsController.getById,
);

router.put(
  '/:id',
  productsMiddlewares.productExistenceCheck,
  productsMiddlewares.validateProductName,

  productsController.updateProduct,
);

router.delete(
  '/:id',
  productsMiddlewares.productExistenceCheck,

  productsController.deleteProduct,
);

module.exports = router;