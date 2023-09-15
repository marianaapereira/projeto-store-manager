// const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );

  // return camelize(products);
  return products;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  // return camelize(product);
  return product;
};

module.exports = {
  getAll,
  getById,
};