import Joi from 'joi';


// Joi schema for validating lead data (both adding and updating)
export const leadSchema = Joi.object({
  first_name: Joi.string().max(100).required().messages({
    "string.empty": "First name is required",
    "string.max": "First name can have a maximum length of 100 characters",
  }),
  last_name: Joi.string().max(100).required().messages({
    "string.empty": "Last name is required",
    "string.max": "Last name can have a maximum length of 100 characters",
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    "string.pattern.base": "Phone number must be between 10 and 15 digits",
    "string.empty": "Phone number is required",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).max(150).required().messages({
    "string.email": "Please provide a valid email address",
    "string.max": "Email can have a maximum length of 150 characters",
    "string.empty": "Email address is required",
  }),
  comments: Joi.string().max(5000).optional().allow(null, '').messages({
    "string.max": "Comments can have a maximum length of 5000 characters",
  }),
  JobType: Joi.string().max(50).required().messages({
    "string.empty": "Job type is required",
    "string.max": "Job type can have a maximum length of 50 characters",
  }),
  ServiceType: Joi.string().max(50).optional().allow(null, '').messages({
    "string.max": "Service type can have a maximum length of 50 characters",
  }),
  MoveDate: Joi.string().max(20).required().messages({
    "string.empty": "Move date is required",
    "string.max": "Move date can have a maximum length of 20 characters",
  }),
  MoveTime: Joi.string().max(20).required().messages({
    "string.empty": "Move time is required",
    "string.max": "Move time can have a maximum length of 20 characters",
  }),
  EstimatedDate: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Estimated date can have a maximum length of 20 characters",
  }),
  EstimatedTime: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Estimated time can have a maximum length of 20 characters",
  }),
  LoadingDwellingSize: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Loading dwelling size can have a maximum length of 20 characters",
  }),
  LoadingPlaceName: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Loading place name can have a maximum length of 20 characters",
  }),
  LeadLoadingApartment: Joi.string().max(200).optional().allow(null, '').messages({
    "string.max": "Lead loading apartment can have a maximum length of 200 characters",
  }),
  LeadLoadingNotes: Joi.string().max(5000).optional().allow(null, '').messages({
    "string.max": "Lead loading notes can have a maximum length of 5000 characters",
  }),
  LoadingAddress: Joi.string().max(50).optional().allow(null, '').messages({
    "string.max": "Loading address can have a maximum length of 50 characters",
  }),
  LoadingZip: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "Loading ZIP code can have a maximum length of 10 characters",
  }),
  LoadingLat: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "Loading latitude can have a maximum length of 10 characters",
  }),
  LoadingLong: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "Loading longitude can have a maximum length of 10 characters",
  }),
  LoadingCity: Joi.string().max(20).required().messages({
    "string.empty": "Loading city is required",
    "string.max": "Loading city can have a maximum length of 20 characters",
  }),
  LoadingState: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Loading state can have a maximum length of 20 characters",
  }),
  LoadingStairs: Joi.string().max(5).optional().allow(null, '').messages({
    "string.max": "Loading stairs can have a maximum length of 5 characters",
  }),
  LoadingNeedHelpPacking: Joi.string().valid('0', '1').optional().allow(null, '').messages({
    "any.only": "Loading need help packing should be '0' or '1'",
  }),
  LoadingPackingDate: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Loading packing date can have a maximum length of 20 characters",
  }),
  LoadingPackingTime: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Loading packing time can have a maximum length of 20 characters",
  }),
  LoadingElevator: Joi.string().valid('0', '1').optional().allow(null, '').messages({
    "any.only": "Loading elevator should be '0' or '1'",
  }),
  LoadingGarage: Joi.string().valid('0', '1').optional().allow(null, '').messages({
    "any.only": "Loading garage should be '0' or '1'",
  }),
  UnloadingDwellingSize: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Unloading dwelling size can have a maximum length of 20 characters",
  }),
  UnloadingPlaceName: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Unloading place name can have a maximum length of 20 characters",
  }),
  UnloadingAddress: Joi.string().max(50).optional().allow(null, '').messages({
    "string.max": "Unloading address can have a maximum length of 50 characters",
  }),
  LeadUnloadingApartment: Joi.string().max(200).optional().allow(null, '').messages({
    "string.max": "Lead unloading apartment can have a maximum length of 200 characters",
  }),
  LeadUnloadingNotes: Joi.string().max(5000).optional().allow(null, '').messages({
    "string.max": "Lead unloading notes can have a maximum length of 5000 characters",
  }),
  UnloadingZip: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "Unloading ZIP code can have a maximum length of 10 characters",
  }),
  UnloadingLat: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "Unloading latitude can have a maximum length of 10 characters",
  }),
  UnloadingLong: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "Unloading longitude can have a maximum length of 10 characters",
  }),
  UnloadingCity: Joi.string().max(20).required().messages({
    "string.empty": "Unloading city is required",
    "string.max": "Unloading city can have a maximum length of 20 characters",
  }),
  UnloadingState: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Unloading state can have a maximum length of 20 characters",
  }),
  UnloadingStairs: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "Unloading stairs can have a maximum length of 20 characters",
  }),
  UnloadingNeedHelpPacking: Joi.string().valid('0', '1').optional().allow(null, '').messages({
    "any.only": "Unloading need help packing should be '0' or '1'",
  }),
  UnloadingElevator: Joi.string().valid('0', '1').optional().allow(null, '').messages({
    "any.only": "Unloading elevator should be '0' or '1'",
  }),
  ndLoadingDwellingSize: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "2nd loading dwelling size can have a maximum length of 20 characters",
  }),
  ndLoadingPlaceName: Joi.string().max(100).optional().allow(null, '').messages({
    "string.max": "2nd loading place name can have a maximum length of 100 characters",
  }),
  ndLoadingApartment: Joi.string().max(200).optional().allow(null, '').messages({
    "string.max": "2nd loading apartment can have a maximum length of 200 characters",
  }),
  ndLoadingAddress: Joi.string().max(50).optional().allow(null, '').messages({
    "string.max": "2nd loading address can have a maximum length of 50 characters",
  }),
  ndLoadingZip: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "2nd loading ZIP code can have a maximum length of 10 characters",
  }),
  ndLoadingLat: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "2nd loading latitude can have a maximum length of 10 characters",
  }),
  ndLoadingLong: Joi.string().max(10).optional().allow(null, '').messages({
    "string.max": "2nd loading longitude can have a maximum length of 10 characters",
  }),
  ndLoadingCity: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "2nd loading city can have a maximum length of 20 characters",
  }),
  ndLoadingState: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "2nd loading state can have a maximum length of 20 characters",
  }),
  ndLoadingStairs: Joi.string().max(5).optional().allow(null, '').messages({
    "string.max": "2nd loading stairs can have a maximum length of 5 characters",
  }),
  ndLoadingNeedHelpPacking: Joi.string().valid('0', '1').optional().allow(null, '').messages({
    "any.only": "2nd loading need help packing should be '0' or '1'",
  }),
  ndLoadingPackingDate: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "2nd loading packing date can have a maximum length of 20 characters",
  }),
  ndLoadingPackingTime: Joi.string().max(20).optional().allow(null, '').messages({
    "string.max": "2nd loading packing time can have a maximum length of 20 characters",
  }),
}).unknown(false);
