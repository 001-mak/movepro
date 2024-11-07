import Joi from 'joi';

export const updateCompanySchema = Joi.object({
  company_name: Joi.string().max(250).optional(),
  street: Joi.string().max(500).optional(),
  city: Joi.string().max(50).optional(),
  state: Joi.string().max(50).optional(),
  zip: Joi.string().max(10).optional(),
  country: Joi.string().max(50).optional(),
  company_logo: Joi.string().max(250).optional(),
  website: Joi.string().max(250).optional(),
  social_fb: Joi.string().optional(),
  social_tw: Joi.string().optional(),
  social_in: Joi.string().optional(),
  social_insta: Joi.string().optional(),
  social_tube: Joi.string().optional(),
}).unknown(false);