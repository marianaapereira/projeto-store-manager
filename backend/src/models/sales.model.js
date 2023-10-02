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

// req 5

const createNewSale = async () => {
  const insertion = 'INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP)';
  const [{ insertId }] = await connection.execute(insertion);

  return insertId;
};

const getInsertedSaleProducts = async (saleId) => {
  const query = `SELECT product_id, quantity FROM sales_products WHERE sale_id = ${saleId}`;
  const [insertedSaleProducts] = await connection.execute(query);

  return insertedSaleProducts;
};

  const registerSale = async (saleProducts) => {
  const saleId = await createNewSale();

  const insertions = saleProducts.map(
      async ({ productId, quantity }) => {
        const insertion = `INSERT INTO sales_products (sale_id, product_id, quantity)
            VALUES (${saleId}, ${productId}, ${quantity})`;
        await connection.execute(insertion); 
    },
  );

  await Promise.all(insertions);
  const insertedSaleProducts = await getInsertedSaleProducts(saleId);

  return { id: saleId, itemsSold: insertedSaleProducts };
};

module.exports = {
  getAll,
  getById,
  registerSale,
};