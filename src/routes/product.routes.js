const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/product.controller');
const { validateProductQuery } = require('../middleware/validation.middleware');

// GET /products - Get paginated products with filters
router.get('/', validateProductQuery, getProducts);

// GET /products/:id - Get single product
router.get('/:id', getProductById);

module.exports = router;