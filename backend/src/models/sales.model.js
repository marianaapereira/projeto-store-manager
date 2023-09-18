const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT * FROM sales 
    INNER JOIN sales_products ON sales.id = sales_products.sale_id`;

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (saleId) => {
  const query = `SELECT * FROM sales 
  INNER JOIN sales_products ON sales.id = sales_products.sale_id
  WHERE id = ${saleId}`;

  const [[sale]] = await connection.execute(query);

  return sale;
};

module.exports = {
  getAll,
  getById,
};