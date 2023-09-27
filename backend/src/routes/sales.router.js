const express = require('express');

const router = express.Router();

const salesController = require('../controllers/sales.controller');

// rotas /sales

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', salesController.registerSale);

module.exports = router;