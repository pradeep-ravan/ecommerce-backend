const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/product.controller');
const { validateProductQuery } = require('../middleware/validation.middleware');

router.get('/', validateProductQuery, getProducts);

router.get('/:id', getProductById);

module.exports = router;