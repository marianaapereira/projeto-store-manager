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
  salesMiddlewares.paramsExistenceCheck,
  salesMiddlewares.quantityValidation,
  salesMiddlewares.productExistenceCheck,

  salesController.registerSale,
);

router.get(
  '/:id', 
  salesController.getById,
);

module.exports = router;