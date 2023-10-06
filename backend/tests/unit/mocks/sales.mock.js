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

const saleProducts = [
  {
    date: '2023-10-05T19:43:20.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-10-05T19:43:20.000Z',
    productId: 2,
    quantity: 10,
  },
];

const saleErrors = {
  saleNotFound: { message: 'Sale not found' },
  productIdIsRequired: { message: '"productId" is required' },
  quantityIsRequired: { message: '"quantity" is required' },
  quantityMustBe: { message: '"quantity" must be greater than or equal to 1' },
}; 

module.exports = { sales, sale, saleErrors, saleProducts };