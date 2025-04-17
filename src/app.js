const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
// const productRoutes = require('./routes/product.routes');
// const categoryRoutes = require('./routes/category.routes');
// const cartRoutes = require('./routes/cart.routes');
const routes = require('./routes/index')

// Import database configuration
const { connectDB } = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/cart', cartRoutes);
app.use('/api',routes)

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start server
app.listen(PORT, async () => {
  await connectDB(app);
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;