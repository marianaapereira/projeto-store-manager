const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products.controller');
const productsMiddlewares = require('../middlewares/products.middlewares');

// rotas /products

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', productsMiddlewares.validateProductName, productsController.registerProduct);

router.put('/:id', productsMiddlewares.validateProductName, productsController.updateProduct);

module.exports = router;