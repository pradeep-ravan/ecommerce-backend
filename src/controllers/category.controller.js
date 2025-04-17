const getCategories = async (req, res) => {
    try {
      const db = req.app.locals.db;
      const categories = await db.collection('categories').find().toArray();
      res.json(categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    getCategories
  };