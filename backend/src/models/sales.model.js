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
    async ({ productId, quantity }, index) => {
      const insertion = `INSERT INTO sales_products (sale_id, product_id, quantity)
        VALUES (${saleId}, ${productId}, ${quantity})`;
      
      try {
        await connection.execute(insertion);
      } catch (error) {
        console.error(`Erro durante a inserção do item ${index}: ${error}`);
      }
    },
  );

  await Promise.all(insertions);
  const insertedSaleProducts = await getInsertedSaleProducts(saleId);

  return { id: saleId, itemsSold: insertedSaleProducts };
};

const deleteSale = async (id) => {
  const deletion = `DELETE FROM sales WHERE id = ${id}`;
  await connection.execute(deletion);
};

const updateProductQuantity = async (saleId, productId, quantity) => {
  const update = `UPDATE sales_products SET quantity = ${quantity} 
    WHERE sale_id = ${saleId} AND product_id = ${productId}`;
  await connection.execute(update);

  const query = `SELECT * FROM sales_products
    INNER JOIN sales ON sales.id = sales_products.sale_id
    WHERE sale_id = ${saleId} AND product_id = ${productId}`;
  const [[updatedProduct]] = await connection.execute(query);

  return updatedProduct;
};

module.exports = {
  getAll,
  getById,
  registerSale,
  deleteSale,
  updateProductQuantity,
};