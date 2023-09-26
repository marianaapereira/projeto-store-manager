const express = require('express');

const router = express.Router();

const salesController = require('../controllers/sales.controller');

// rotas /sales

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', salesController.registerSale);

// router.delete('/:id', async (req, res) => {
//   res.status(HTTP_NO_CONTENT_STATUS).end();
// });

module.exports = router;