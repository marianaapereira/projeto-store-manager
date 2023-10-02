const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id ASC';
  
  const [products] = await connection.execute(query);

  return products;
};

const getById = async (id) => {
  const query = `SELECT * FROM products WHERE id = ${id}`;

  const [[product]] = await connection.execute(query);

  return product;
};

const registerProduct = async (name) => {
  const insertion = `INSERT INTO products (name) VALUES ('${name}')`;
  const [{ insertId }] = await connection.execute(insertion);

  const query = `SELECT * FROM products WHERE id = ${insertId}`;
  const [[newProduct]] = await connection.execute(query);

  return newProduct;
};

const updateProduct = async ({ id, name }) => {
  const update = `UPDATE products SET name = '${name}' WHERE id = ${id}`;
  await connection.execute(update);

  const query = `SELECT * FROM products WHERE id = ${id}`;
  const [[updatedProduct]] = await connection.execute(query);

  return updatedProduct;
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
};