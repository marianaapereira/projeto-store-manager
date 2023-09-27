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

  return product;
};

const registerProduct = async (productName) => {
  const insertion = `INSERT INTO products (name) VALUES ('${productName}')`;
  const [{ insertId }] = await connection.execute(insertion);

  const query = `SELECT * FROM products WHERE id = ${insertId}`;
  const [[newProduct]] = await connection.execute(query);

  return newProduct;
};

// const registerProduct = async (productName) => productName;

module.exports = {
  getAll,
  getById,
  registerProduct,
};