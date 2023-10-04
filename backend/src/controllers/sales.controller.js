const salesService = require('../services/sales.service');

const {
  HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS, HTTP_CREATED_STATUS, HTTP_NO_CONTENT_STATUS,
} = require('../consts/httpStatusCodes');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(HTTP_OK_STATUS).json(sales);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    return res.status(HTTP_OK_STATUS).json(sale);
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
};

const registerSale = async (req, res) => {
  const newSalesArray = req.body;
  const registeredSale = await salesService.registerSale(newSalesArray);

  return res.status(HTTP_CREATED_STATUS).json(registeredSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  await salesService.deleteSale(id);

  return res.status(HTTP_NO_CONTENT_STATUS).json();
};

module.exports = {
  getAll,
  getById,
  registerSale,
  deleteSale,
};