import Joi from 'joi';

export const createTruckSchema = Joi.object({
  company_id: Joi.number().required(),
  rented: Joi.boolean().required(),
  make: Joi.string().max(255).required(),
  model: Joi.string().max(255).required(),
  year_of_manufacture: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  vin: Joi.string().max(255).required(),
  license_plate_number: Joi.string().max(50).required(),
  license_plate_state_province: Joi.string().max(50).required(),
  truck_type: Joi.string().max(100).required(),
  truck_capacity: Joi.string().max(50).required(),
  owner_name: Joi.string().max(255).required(),
  lease_details: Joi.string().optional().allow(null),
  insurance_provider: Joi.string().max(255).optional().allow(null),
  insurance_policy_number: Joi.string().max(255).optional().allow(null),
  fuel_efficiency: Joi.string().max(100).optional().allow(null),
  tare_weight: Joi.string().max(100).optional().allow(null), // Empty truck weight
  payload_capacity: Joi.string().max(100).optional().allow(null),
  volume: Joi.string().max(100).required(),
  last_maintenance_date: Joi.date().optional().allow(null),
  next_maintenance_date: Joi.date().optional().allow(null),
  dot_compliance_number: Joi.string().max(50).optional().allow(null), // USA-specific
  cvor_number: Joi.string().max(50).optional().allow(null), // Canada-specific
  cargo_restrictions: Joi.string().optional().allow(null),
  vehicle_notes: Joi.string().optional().allow(null),
  special_permits: Joi.string().optional().allow(null)
}).unknown(false);
