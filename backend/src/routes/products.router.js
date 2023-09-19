const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products.controller');

const productsMiddlewares = require('../middlewares/products.middlewares');

// rotas /products

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', productsMiddlewares.validateProductName, productsController.registerProduct);

// app.get('/orders/:id', ordersController.getById);

// app.post('/orders', validCreatePizza, ordersController.create);

// router.post('/', async (req, res) => {
//   res.status(HTTP_CREATED_STATUS).json({ message: 'created product' });
// });

// router.put('/:id', async (req, res) => {
//   res.status(HTTP_OK_STATUS).json({ message: 'updated product' });
// });

// router.delete('/:id', async (req, res) => {
//   res.status(HTTP_NO_CONTENT_STATUS).end();
// });

module.exports = router;