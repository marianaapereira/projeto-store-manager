const express = require('express');
const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales');

const app = express();

app.use(express.json());

// const products = require('./routes/products');

// não remova esse endpoint, é para o avaliador funcionar

app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

//

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

module.exports = app;