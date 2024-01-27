const Joi = require('joi');

// Joi schema for user registration
const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

const validateRegistration = (data) => registrationSchema.validate(data, { abortEarly: false });

module.exports = { validateRegistration };
