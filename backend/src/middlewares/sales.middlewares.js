// const productsService = require('../services/products.service');

// const { 
//   HTTP_BAD_REQUEST_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS,
// } = require('../consts/httpStatusCodes');

// const MIN_QUANTITY_NUMBER = 1;

// const validadeProductsIds = async (req, res, next) => {
//   const salesProductsArray = req.body;

//   salesProductsArray.map(async ({ productId }) => {
//     if (!productId) {
//       return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
//         message: '"productId" is required',
//       });
//     }

//     if (!productId) {
//       return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
//         message: '"productId" is required',
//       });
//     }

//     await productsService.getById(productId);
//   });

//   next();
// };

// const validadeProductsQuantities = (req, res, next) => {
//   const salesProductsArray = req.body;

//   salesProductsArray.forEach(({ quantity }) => {
//     if (!quantity) {
//       return res.status(HTTP_BAD_REQUEST_STATUS).json({
//         message: '"quantity" is required', 
//       });
//     }

//     if (quantity < MIN_QUANTITY_NUMBER) {
//       return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json({ 
//         message: '"quantity" must be greater than or equal to 1',
//       });
//     }
//   });

//   next();
// };

// module.exports = {
//   validadeProductsIds,
//   validadeProductsQuantities,
// };