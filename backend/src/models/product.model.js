// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );

  // return camelize(products);
  return (products);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  // return camelize(product);
  return (product);
};

module.exports = {
  findAll,
  findById,
};