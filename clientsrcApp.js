const Joi = require('joi');

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(20).max(60).required(),
    address: Joi.string().max(400).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16)
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])'))
      .required(),
    role: Joi.string().valid('ADMIN', 'USER', 'STORE_OWNER')
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validateUser };