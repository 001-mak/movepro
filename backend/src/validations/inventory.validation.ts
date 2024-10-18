import Joi from 'joi';

export const inventoryGroupSchema = Joi.object({
  group_name: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.max': 'Group name can have a maximum length of 100 characters',
      'string.empty': 'Group name is required',
    }),

  company_id: Joi.number()
    .integer()
    .optional()
    .messages({
      'number.base': 'Company ID must be a valid number',
      'number.integer': 'Company ID must be an integer',
      'any.required': 'Company ID is required',
    }),
}).unknown(false);


export const inventoryGroupItemSchema = Joi.object({
    group_id: Joi.number()
      .integer()
      .optional()
      .messages({
        'number.base': 'Group ID must be a valid number',
        'number.integer': 'Group ID must be an integer',
      }),
  
    item_name: Joi.string()
      .max(100)
      .optional()
      .messages({
        'string.max': 'Item name can have a maximum length of 100 characters',
      }),
  
    item_size: Joi.string()
      .max(100)
      .optional()
      .messages({
        'string.max': 'Item size can have a maximum length of 100 characters',
      }),
  }).unknown(false);
  