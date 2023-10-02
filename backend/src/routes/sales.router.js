const express = require('express');

const router = express.Router();

const salesController = require('../controllers/sales.controller');
// const salesMiddlewares = require('../middlewares/sales.middlewares');

// rotas /sales

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post(
  '/', 
  // salesMiddlewares.validadeProductsQuantities,
  // salesMiddlewares.validadeProductsIds,
  salesController.registerSale,
);

module.exports = router;