const Joi = require('joi');

const productQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(9),
  sort: Joi.string().valid('latest', 'price-low-high', 'price-high-low').default('latest'),
  category: Joi.array().items(Joi.string()).single(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0)
});

const addToCartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});

const validateProductQuery = (req, res, next) => {
  const { error, value } = productQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  req.validatedParams = value;
  next();
};

const validateAddToCart = (req, res, next) => {
  const { error, value } = addToCartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  req.validatedData = value;
  next();
};

module.exports = {
  validateProductQuery,
  validateAddToCart
};