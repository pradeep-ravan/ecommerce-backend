const getCategories = async (req, res) => {
  try {
    if (!req.app.locals.db) {
      return res.status(500).json({ error: 'Database connection not established' });
    }
    
    const db = req.app.locals.db;
    const categories = await db.collection('categories').find().toArray();
    
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }
    
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCategories
};