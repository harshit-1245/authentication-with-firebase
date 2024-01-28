const Joi = require('joi');

// Joi schema for user registration
const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});
//joi schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateRegistration = (data) => registrationSchema.validate(data, { abortEarly: false });

//validation function for user login
const validateLogin=(data)=>loginSchema.validate(data,{abortEarly:false})
module.exports = { validateRegistration,validateLogin };
