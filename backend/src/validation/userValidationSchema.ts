import Joi from "joi";

export const updateUserSchema = Joi.object({
  first_name: Joi.string().max(255).optional().messages({
    "string.base": "First name must be a string",
    "string.max": "First name cannot exceed 255 characters",
  }),
  last_name: Joi.string().max(255).optional().messages({
    "string.base": "Last name must be a string",
    "string.max": "Last name cannot exceed 255 characters",
  }),
  password: Joi.string().min(8).optional().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 8 characters long",
  }),
  phone_no: Joi.string()
    .pattern(/^[0-9]{10,20}$/)
    .optional()
    .messages({
      "string.base": "Phone number must be a string",
      "string.pattern.base": "Phone number must be between 10 and 20 digits",
    }),
  picture: Joi.string().uri().optional().messages({
    "string.base": "Picture must be a valid URI",
  }),
  bio: Joi.string().optional().messages({
    "string.base": "Bio must be a string",
  }),
  cover_photo: Joi.string().uri().optional().messages({
    "string.base": "Cover photo must be a valid URI",
  }),
  street: Joi.string().max(255).optional().messages({
    "string.base": "Street must be a string",
    "string.max": "Street cannot exceed 255 characters",
  }),
  city: Joi.string().max(255).optional().messages({
    "string.base": "City must be a string",
    "string.max": "City cannot exceed 255 characters",
  }),
  state: Joi.string().max(255).optional().messages({
    "string.base": "State must be a string",
    "string.max": "State cannot exceed 255 characters",
  }),
  zip: Joi.string().max(10).optional().messages({
    "string.base": "Zip must be a string",
    "string.max": "Zip cannot exceed 10 characters",
  }),
  country: Joi.string().max(255).optional().messages({
    "string.base": "Country must be a string",
    "string.max": "Country cannot exceed 255 characters",
  }),
  user_role: Joi.string().max(50).optional().messages({
    "string.base": "User role must be a string",
    "string.max": "User role cannot exceed 50 characters",
  }),
  hire_date: Joi.string().isoDate().optional().messages({
    "string.base": "Hire date must be a valid ISO date",
  }),
  current_pay: Joi.string().max(10).optional().messages({
    "string.base": "Current pay must be a string",
    "string.max": "Current pay cannot exceed 10 characters",
  }),
}).unknown(false);

export const createUserSchema = Joi.object({
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

export const userSearchSchema = Joi.object({
  email_id: Joi.string().max(255).optional(),
  first_name: Joi.string().max(255).optional(),
  last_name: Joi.string().max(255).optional(),
  phone_no: Joi.string().max(255).optional(),
  searchText: Joi.string().max(255).optional(),
}).unknown(false)
