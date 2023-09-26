const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT * FROM sales 
    INNER JOIN sales_products ON sales.id = sales_products.sale_id`;

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (saleId) => {
  const query = `SELECT * FROM sales_products 
  INNER JOIN sales ON sales.id = sales_products.sale_id
  WHERE id = ${saleId}`;

  const [sale] = await connection.execute(query);

  return sale;
};

const registerSale = async (saleProducts) => {
  const insertionSale = 'INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP)';
  const [{ insertId }] = await connection.execute(insertionSale);

  saleProducts.forEach(async ({ productId, quantity }) => {
    const insertion = `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (${insertId}, ${productId}, ${quantity})`;
    await connection.execute(insertion);
  });

  const query = `SELECT product_id, quantity FROM sales_products WHERE sale_id = ${insertId}`;
  const [itemsSold] = await connection.execute(query);

  return { id: insertId, itemsSold };
};

module.exports = {
  getAll,
  getById,
  registerSale,
};