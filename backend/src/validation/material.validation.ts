const Joi = require('joi');

export const materialValidationSchema = Joi.object({
  material_name: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'Material name should be a string.',
      'string.empty': 'Material name cannot be empty.',
      'string.max': 'Material name should not exceed 100 characters.',
      'any.required': 'Material name is required.'
    }),
    
  material_description: Joi.string()
    .max(500)
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Material description should be a string.',
      'string.max': 'Material description should not exceed 500 characters.'
    }),

  material_price: Joi.number()
    .greater(0)
    .required()
    .messages({
      'number.base': 'Material price must be a number.',
      'number.greater': 'Material price must be greater than 0.',
      'any.required': 'Material price is required.'
    })
});


