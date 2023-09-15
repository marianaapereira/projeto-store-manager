const express = require('express');

const router = express.Router();

const { productModel } = require('../models');

const { 
  HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_NO_CONTENT_STATUS, 
} = require('../consts/http-status-codes');

// rotas /products

router.get('/', async (req, res) => {
  const products = await productModel.findAll();
  // res.status(HTTP_OK_STATUS).json({ message: 'products' });
  res.status(HTTP_OK_STATUS).json(products);
});

router.get('/:id', async (req, res) => {
  res.status(HTTP_OK_STATUS).json({ message: 'product id' });
});

router.post('/', async (req, res) => {
  res.status(HTTP_CREATED_STATUS).json({ message: 'created product' });
});

router.put('/:id', async (req, res) => {
  res.status(HTTP_OK_STATUS).json({ message: 'updated product' });
});

router.delete('/:id', async (req, res) => {
  res.status(HTTP_NO_CONTENT_STATUS).end();
});

module.exports = router;