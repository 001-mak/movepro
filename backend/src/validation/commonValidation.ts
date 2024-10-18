import Joi from "joi";

export const paramsIdSchema = Joi.object({
    id:Joi.string().max(255).required()
}).unknown(false);