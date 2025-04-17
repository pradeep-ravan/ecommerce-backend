const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cart.controller');
const { validateAddToCart } = require('../middleware/validation.middleware');

// POST /cart/add - Add product to cart
router.post('/add', validateAddToCart, addToCart);

// GET /cart - Get cart contents
router.get('/', getCart);

// DELETE /cart/remove/:productId - Remove item from cart
router.delete('/remove/:productId', removeFromCart);

module.exports = router;