const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cart.controller');
const { validateAddToCart } = require('../middleware/validation.middleware');

router.post('/add', validateAddToCart, addToCart);

router.get('/', getCart);

router.delete('/remove/:productId', removeFromCart);

module.exports = router;