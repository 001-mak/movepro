import Joi from "joi";

export const paramsIdSchema = Joi.object({
    id:Joi.string().max(255).required()
}).unknown(false);

export const pagedSearchQuerySchema = Joi.object({
    pageIndex: Joi.number().integer().min(1).default(1).optional(),
    pageSize: Joi.number().integer().min(1).max(100).default(10).optional(),
    orderBy: Joi.string()
      .valid('id', 'first_name', 'last_name', 'email_id')
      .default('id')
      .optional(),
    orderDirection: Joi.string()
      .valid('asc', 'desc')
      .default('asc')
      .optional(),
    searchText: Joi.string().optional(),
    searchFilters: Joi.string().optional(),
    // Add any other searchable fields as optional strings if needed
  }).unknown(false);