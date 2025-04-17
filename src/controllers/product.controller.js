const { ObjectId } = require('mongodb');

const getProducts = async (req, res) => {
  try {
    const { page, limit, sort, category, minPrice, maxPrice } = req.validatedParams;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    // Apply category filter
    if (category) {
      filter.category = Array.isArray(category) ? { $in: category } : category;
    }
    
    // Apply price filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }
    
    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'latest':
        sortObj = { createdAt: -1 };
        break;
      case 'price-low-high':
        sortObj = { price: 1 };
        break;
      case 'price-high-low':
        sortObj = { price: -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }
    
    const db = req.app.locals.db;
    
    // Execute query
    const products = await db.collection('products')
      .find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Get total count for pagination
    const total = await db.collection('products').countDocuments(filter);
    
    // Return data with pagination metadata
    res.json({
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const db = req.app.locals.db;
    
    // Check if id is valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    const product = await db.collection('products').findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getProducts,
  getProductById
};