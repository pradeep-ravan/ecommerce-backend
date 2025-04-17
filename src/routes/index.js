const express = require('express')

const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const cartRoutes = require('./cart.routes');

const router = express.Router()
router.use("/products", productRoutes)
router.use("/categories", categoryRoutes)
router.use("/cart", cartRoutes)

module.exports = router