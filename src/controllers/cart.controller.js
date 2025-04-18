const { ObjectId } = require('mongodb');

const carts = {};

function getSessionId(req) {
  return req.headers['session-id'] || 'default-session';
}

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.validatedData;
    const sessionId = getSessionId(req);
    
    const db = req.app.locals.db;
    
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    const product = await db.collection('products').findOne({ 
      _id: new ObjectId(productId) 
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (!carts[sessionId]) {
      carts[sessionId] = [];
    }
    
    const existingItemIndex = carts[sessionId].findIndex(
      item => item.productId === productId
    );
    
    if (existingItemIndex !== -1) {
      carts[sessionId][existingItemIndex].quantity += quantity;
    } else {
      carts[sessionId].push({
        productId,
        quantity,
        productDetails: {
          title: product.title,
          price: product.price,
          image: product.image
        }
      });
    }
    
    res.status(201).json({ 
      message: 'Product added to cart',
      cart: carts[sessionId]
    });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCart = (req, res) => {
  const sessionId = getSessionId(req);
  const cart = carts[sessionId] || [];
  
  res.json({
    items: cart,
    totalItems: cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: cart.reduce((total, item) => total + (item.productDetails.price * item.quantity), 0)
  });
};

const removeFromCart = (req, res) => {
  const { productId } = req.params;
  const sessionId = getSessionId(req);
  
  if (!carts[sessionId]) {
    return res.status(404).json({ error: 'Cart not found' });         
  }
  
  const initialLength = carts[sessionId].length;
  carts[sessionId] = carts[sessionId].filter(item => item.productId !== productId);
  
  if (carts[sessionId].length === initialLength) {
    return res.status(404).json({ error: 'Product not found in cart' });
  }
  
  res.json({ 
    message: 'Product removed from cart',
    cart: carts[sessionId]
  });
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart
};