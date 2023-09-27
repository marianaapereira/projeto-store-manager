const sales = [
  {
    saleId: 1,
    date: '2023-09-19T00:11:39.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-09-19T00:11:39.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-09-19T00:11:39.000Z',
    productId: 3,
    quantity: 15,
  },
];

const sale = [
  {
    date: '2023-09-19T00:11:39.000Z',
    productId: 3,
    quantity: 15,
  },
];

const notFoundError = { message: 'Sale not found' };

module.exports = { sales, sale, notFoundError };