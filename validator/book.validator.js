const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    author: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    mobile: Joi.number().min(10).max(13),
    price: Joi.number().min(1).max(13),
    publishedDate: Joi.date()
  });


  const validateRequest = (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }
  
    next();
  };

  module.exports = {
    validateRequest,
};
