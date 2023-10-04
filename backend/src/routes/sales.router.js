const express = require('express');

const router = express.Router();

const salesController = require('../controllers/sales.controller');
const salesMiddlewares = require('../middlewares/sales.middlewares');

// rotas /sales

router.get(
  '/', 
  salesController.getAll,
);

router.post(
  '/', 
  salesMiddlewares.paramsValidations,
  salesMiddlewares.productsExistenceCheck,

  salesController.registerSale,
);

router.get(
  '/:id', 
  salesController.getById,
);

router.delete(
  '/:id', 
  salesMiddlewares.saleExistenceCheck,

  salesController.deleteSale,
);

router.put(
  '/:saleId/products/:productId/quantity',
  salesMiddlewares.quantityValidations,
  salesMiddlewares.productInSaleValidation,

  salesController.updateProductQuantity,
);

module.exports = router;