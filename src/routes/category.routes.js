const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/category.controller');

// GET /categories - Get all categories
router.get('/', getCategories);

module.exports = router;