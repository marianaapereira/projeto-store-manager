// const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id ASC';
  
  const [products] = await connection.execute(query);

  // return camelize(products);
  return products;
};

const getById = async (productId) => {
  const query = `SELECT * FROM products WHERE id = ${productId}`;

  const [[product]] = await connection.execute(query);

  // return camelize(product);
  return product;
};

module.exports = {
  getAll,
  getById,
};