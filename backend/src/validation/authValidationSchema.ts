import Joi from "joi";

export const userRegisterSchema = Joi.object({
  email_id: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.max": "Email address can have a maximum length of 255 characters",
      "string.empty": "Email address is required",
    }),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"
      )
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password should have at least 8 characters",
      "string.max": "Password can have a maximum length of 128 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),

  company_name: Joi.string().max(255).required().messages({
    "string.max": "Company name can have a maximum length of 255 characters",
    "string.empty": "Company name is required",
  }),

  first_name: Joi.string().max(255).required().messages({
    "string.max": "First name can have a maximum length of 255 characters",
    "string.empty": "First name is required",
  }),

  last_name: Joi.string().max(255).required().messages({
    "string.max": "Last name can have a maximum length of 255 characters",
    "string.empty": "Last name is required",
  }),

  phone_no: Joi.string()
    .pattern(/^[0-9]{10,20}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 10 and 20 digits",
      "string.empty": "Phone number is required",
    }),

  street: Joi.string().max(255).required().messages({
    "string.max": "Street address can have a maximum length of 255 characters",
    "string.empty": "Street address is required",
  }),

  city: Joi.string().max(255).required().messages({
    "string.max": "City can have a maximum length of 255 characters",
    "string.empty": "City is required",
  }),

  state: Joi.string().max(255).required().messages({
    "string.max": "State can have a maximum length of 255 characters",
    "string.empty": "State is required",
  }),

  zip: Joi.string().max(255).required().messages({
    "string.max": "ZIP code can have a maximum length of 255 characters",
    "string.empty": "ZIP code is required",
  }),

  country: Joi.string().max(255).required().messages({
    "string.max": "Country can have a maximum length of 255 characters",
    "string.empty": "Country is required",
  }),

  ssn: Joi.string()
    .pattern(/^[0-9]{9}$/)
    .required()
    .messages({
      "string.pattern.base": "SSN must be exactly 9 digits",
      "string.empty": "SSN is required",
    }),

  hire_date: Joi.string().isoDate().optional().messages({
    "string.isoDate": "Hire date must be a valid ISO date",
  }),

  current_pay: Joi.string().max(10).optional().messages({
    "string.max": "Current pay can have a maximum length of 10 characters",
  }),
}).unknown(false);

export const userLoginSchema = Joi.object({
  email_id: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
}).unknown(false);

export const forgotPassSchema = Joi.object({
  email_id: Joi.string().email().max(255).required(),
}).unknown(false);

export const resetPassSchema = Joi.object({
  token: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
}).unknown(false);

// CREATE Admin Joi validation schema
export const createAdminSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).trim().required().messages({
    "string.empty": "First name is required",
    "string.min": "First name should have a minimum length of 2 characters",
    "string.max": "First name can have a maximum length of 50 characters",
  }),

  last_name: Joi.string().min(2).max(50).trim().required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name should have a minimum length of 2 characters",
    "string.max": "Last name can have a maximum length of 50 characters",
  }),

  email_id: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email address is required",
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"
      )
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password should have at least 8 characters",
      "string.max": "Password can have a maximum length of 128 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
}).unknown(false);