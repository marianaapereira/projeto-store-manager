// const express = require('express');

// const router = express();

// const { 
//   HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_NO_CONTENT_STATUS, 
// } = require('../consts/http-status-codes');

// router.get('/', async (req, res) => {
//   res.status(HTTP_OK_STATUS).json({ message: 'sales' });
// });

// router.get('/:id', async (req, res) => {
//   res.status(HTTP_OK_STATUS).json({ message: 'sale id' });
// });

// router.post('/', async (req, res) => {
//   res.status(HTTP_CREATED_STATUS).json({ message: 'created sale' });
// });

// router.delete('/:id', async (req, res) => {
//   res.status(HTTP_NO_CONTENT_STATUS).end();
// });

// module.exports = router;