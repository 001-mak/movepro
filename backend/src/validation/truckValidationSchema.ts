import Joi from 'joi';

export const createTruckSchema = Joi.object({
  rented: Joi.boolean().allow(null), // Can be true, false, or null
  make: Joi.string().max(255).required(), // Required string with a maximum length of 255
  model: Joi.string().max(255).required(), // Required string with a maximum length of 255
  year_of_manufacture: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(), // Required integer between 1900 and the current year
  vin: Joi.string().max(255).required(), // Required string, assumed to have a max length of 255
  license_plate_number: Joi.string().max(50).required(), // Required string with a max length of 50
  license_plate_state_province: Joi.string().max(50).required(), // Required string with a max length of 50
  truck_type: Joi.string().max(100).required(), // Required string with a max length of 100
  truck_capacity: Joi.string().max(50).allow(null), // Optional string with a max length of 50
  owner_name: Joi.string().max(255).required(), // Required string with a max length of 255
  lease_details: Joi.string().allow(null), // Optional text, no length restriction
  insurance_provider: Joi.string().max(255).allow(null), // Optional string with a max length of 255
  insurance_policy_number: Joi.string().max(255).allow(null), // Optional string with a max length of 255
  fuel_efficiency: Joi.string().max(100).allow(null), // Optional string with a max length of 100
  tare_weight: Joi.string().max(100).allow(null), // Optional string with a max length of 100
  payload_capacity: Joi.string().max(100).allow(null), // Optional string with a max length of 100
  volume: Joi.string().max(100).required(), // Required string with a max length of 100
  last_maintenance_date: Joi.date().allow(null), // Optional date
  next_maintenance_date: Joi.date().allow(null), // Optional date
  dot_compliance_number: Joi.string().max(50).allow(null), // Optional string with a max length of 50
  cvor_number: Joi.string().max(50).allow(null), // Optional string with a max length of 50
  cargo_restrictions: Joi.string().allow(null), // Optional text, no length restriction
  vehicle_notes: Joi.string().allow(null), // Optional text, no length restriction
  special_permits: Joi.string().allow(null), // Optional text, no length restriction
  driver_id: Joi.number().integer().positive().allow(null), // Optional positive integer
}).unknown(false);


export const updateTruckSchema = Joi.object({
  rented: Joi.boolean().allow(null), // Can be true, false, or null
  make: Joi.string().max(255).optional(), // Required string with a maximum length of 255
  model: Joi.string().max(255).optional(), // Required string with a maximum length of 255
  year_of_manufacture: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(), // Required integer between 1900 and the current year
  vin: Joi.string().max(255).optional(), // Required string, assumed to have a max length of 255
  license_plate_number: Joi.string().max(50).optional(), // Required string with a max length of 50
  license_plate_state_province: Joi.string().max(50).optional(), // Required string with a max length of 50
  truck_type: Joi.string().max(100).optional(), // Required string with a max length of 100
  truck_capacity: Joi.string().max(50).allow(null), // Optional string with a max length of 50
  owner_name: Joi.string().max(255).optional(), // Required string with a max length of 255
  lease_details: Joi.string().allow(null), // Optional text, no length restriction
  insurance_provider: Joi.string().max(255).allow(null), // Optional string with a max length of 255
  insurance_policy_number: Joi.string().max(255).allow(null), // Optional string with a max length of 255
  fuel_efficiency: Joi.string().max(100).allow(null), // Optional string with a max length of 100
  tare_weight: Joi.string().max(100).allow(null), // Optional string with a max length of 100
  payload_capacity: Joi.string().max(100).allow(null), // Optional string with a max length of 100
  volume: Joi.string().max(100).optional(), // Required string with a max length of 100
  last_maintenance_date: Joi.date().allow(null), // Optional date
  next_maintenance_date: Joi.date().allow(null), // Optional date
  dot_compliance_number: Joi.string().max(50).allow(null), // Optional string with a max length of 50
  cvor_number: Joi.string().max(50).allow(null), // Optional string with a max length of 50
  cargo_restrictions: Joi.string().allow(null), // Optional text, no length restriction
  vehicle_notes: Joi.string().allow(null), // Optional text, no length restriction
  special_permits: Joi.string().allow(null), // Optional text, no length restriction
  driver_id: Joi.number().integer().positive().allow(null), // Optional positive integer
}).unknown(false);