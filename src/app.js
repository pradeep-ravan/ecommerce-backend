const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('Starting application initialization...');

// Import routes
// const productRoutes = require('./routes/product.routes');
// const categoryRoutes = require('./routes/category.routes');
// const cartRoutes = require('./routes/cart.routes');
console.log('Importing route modules...');
const routes = require('./routes/index');
console.log('Route modules imported successfully');

// Import database configuration
console.log('Importing database configuration...');
const { connectDB } = require('./config/db.config');
console.log('Database configuration imported successfully');

const app = express();
const PORT = process.env.PORT || 5000;
console.log(`PORT set to ${PORT}`);

// Middleware
console.log('Setting up middleware...');
app.use(cors());
console.log('CORS middleware applied');
app.use(express.json());
console.log('JSON body parser middleware applied');

// Health check endpoint
console.log('Setting up health check endpoint...');
app.get('/', (req, res) => {
  console.log('Health check endpoint accessed');
  res.json({ message: 'API is running' });
});
console.log('Health check endpoint setup complete');

// First connect to the database, then start the server and set up routes
async function startServer() {
  try {
    console.log('Starting server initialization process...');
    
    // Connect to DB first
    console.log('Attempting database connection...');
    await connectDB(app);
    console.log('Database connection successful, app.locals.db is set');
    
    // Set up routes after DB connection is established
    console.log('Setting up API routes...');
    app.use('/api', routes);
    console.log('API routes setup complete');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is now listening on port ${PORT}`);
      console.log('Server initialization complete and ready to accept requests');
    });
  } catch (err) {
    console.error('Server initialization failed with error:', err);
    process.exit(1);
  }
}

// Start the server
console.log('Calling startServer function...');
startServer();
console.log('startServer function called, continuing with async operations');
