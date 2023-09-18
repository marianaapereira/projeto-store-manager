// arquivo que retorna os status http e/ou mensagens de erro

const salesService = require('../services/sales.service');

const {
  HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS,
} = require('../consts/httpStatusCodes');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(HTTP_OK_STATUS).json(sales);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    if (!sale) {
      throw new Error('Sale not found');
    }

    return res.status(HTTP_OK_STATUS).json(sale);
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
};

module.exports = {
  getAll,
  getById,
};