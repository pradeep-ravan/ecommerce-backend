const { MongoClient } = require('mongodb');

let db;

const connectDB = async (app) => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('MongoDB connected');
    db = client.db('ecommerce');
    
    app.locals.db = db;
    
    await initializeData(db);
    
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};


async function initializeData(db) {
  const productCount = await db.collection('products').countDocuments();
  
  if (productCount === 0) {
    // Sample categories
    const categories = [
      { name: 'Fertilizers', slug: 'fertilizers' },
      { name: 'Seeds', slug: 'seeds' },
      { name: 'Irrigation tools', slug: 'irrigation-tools' },
      { name: 'Agricultural tools', slug: 'agricultural-tools' },
      { name: 'Agricultural sensors', slug: 'agricultural-sensors' }
    ];
    
    await db.collection('categories').insertMany(categories);
    

    const products = [];
    
    // Creating fertilizer products
    for (let i = 1; i <= 4; i++) {
      products.push({
        title: `Organic Mixture ${i}`,
        price: 30 + Math.floor(Math.random() * 10),
        category: 'fertilizers',
        rating: (3 + Math.random() * 2).toFixed(1),
        description: 'High-quality organic fertilizer for all types of plants.',
        image: `/images/tool-${i}.jpg`,
        createdAt: new Date()
      });
    }
    
    for (let i = 1; i <= 4; i++) {
      products.push({
        title: `Premium Seeds ${i}`,
        price: 10 + Math.floor(Math.random() * 30),
        category: 'seeds',
        rating: (3 + Math.random() * 2).toFixed(1),
        description: 'High germination rate seeds for your garden.',
        image: `https://via.placeholder.com/300x200?text=Seeds+${i}`,
        createdAt: new Date()
      });
    }
    
    for (let i = 1; i <= 4; i++) {
      products.push({
        title: `Garden Tool ${i}`,
        price: 50 + Math.floor(Math.random() * 50),
        category: 'agricultural-tools',
        rating: (3 + Math.random() * 2).toFixed(1),
        description: 'Durable tools for everyday gardening.',
        image: `https://via.placeholder.com/300x200?text=Tool+${i}`,
        createdAt: new Date()
      });
    }
    
    await db.collection('products').insertMany(products);
    console.log('Sample data inserted');
  }
}

module.exports = { connectDB };