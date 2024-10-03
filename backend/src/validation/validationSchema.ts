import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  email_id: Joi.string().email().max(255).required(),
  first_name: Joi.string().max(255).required(),
  last_name: Joi.string().max(255).required(),
  phone_no: Joi.string().pattern(/^[0-9]{10,20}$/).required(), // Ensure valid phone number
  street: Joi.string().max(255).required(),
  city: Joi.string().max(255).required(),
  state: Joi.string().max(255).required(),
  zip: Joi.string().max(255).required(),
  country: Joi.string().max(255).required(),
  ssn: Joi.string().pattern(/^[0-9]{9}$/).required(), // SSN validation, assuming 9 digits
  hire_date: Joi.string().isoDate().allow(null, ''), // ISO date for hire_date
  current_pay: Joi.string().max(10).allow(null, ''),
});

export const userLoginSchema = Joi.object({
  email_id: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required()
});

export const forgotPassSchema = Joi.object({
  email_id: Joi.string().email().max(255).required(),
});

export const resetPassSchema = Joi.object({
  token: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required()
});
