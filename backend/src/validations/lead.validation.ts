const Joi = require('joi');

export const leadSchema = Joi.object({
  id: Joi.number().integer().optional().messages({
    'number.base': 'ID must be a number.',
    'number.integer': 'ID must be an integer.',
  }),
  first_name: Joi.string().max(100).required().messages({
    'string.base': 'First name must be a string.',
    'string.empty': 'First name cannot be empty.',
    'string.max': 'First name cannot exceed 100 characters.',
  }),
  last_name: Joi.string().max(100).required().messages({
    'string.base': 'Last name must be a string.',
    'string.empty': 'Last name cannot be empty.',
    'string.max': 'Last name cannot exceed 100 characters.',
  }),
  phone_no: Joi.string().max(15).optional().messages({
    'string.base': 'Phone must be a string.',
    'string.max': 'Phone cannot exceed 15 characters.',
  }),
  email_id: Joi.string().email().max(150).required().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Email must be a valid email address.',
    'string.empty': 'Email cannot be empty.',
    'string.max': 'Email cannot exceed 150 characters.',
  }),
  comments: Joi.string().optional().messages({
    'string.base': 'Comments must be a string.',
  }),
  JobType: Joi.string().max(50).required().messages({
    'string.base': 'Job Type must be a string.',
    'string.empty': 'Job Type cannot be empty.',
    'string.max': 'Job Type cannot exceed 50 characters.',
  }),
  ServiceType: Joi.string().max(50).optional().messages({
    'string.base': 'Service Type must be a string.',
    'string.max': 'Service Type cannot exceed 50 characters.',
  }),
  MoveDate: Joi.string().max(20).required().messages({
    'string.base': 'Move Date must be a string.',
    'string.empty': 'Move Date cannot be empty.',
    'string.max': 'Move Date cannot exceed 20 characters.',
  }),
  MoveTime: Joi.string().max(20).required().messages({
    'string.base': 'Move Time must be a string.',
    'string.empty': 'Move Time cannot be empty.',
    'string.max': 'Move Time cannot exceed 20 characters.',
  }),
  EstimatedDate: Joi.string().max(20).optional().messages({
    'string.base': 'Estimated Date must be a string.',
    'string.max': 'Estimated Date cannot exceed 20 characters.',
  }),
  EstimatedTime: Joi.string().max(20).optional().messages({
    'string.base': 'Estimated Time must be a string.',
    'string.max': 'Estimated Time cannot exceed 20 characters.',
  }),
  LoadingDwellingSize: Joi.string().max(20).optional().messages({
    'string.base': 'Loading Dwelling Size must be a string.',
    'string.max': 'Loading Dwelling Size cannot exceed 20 characters.',
  }),
  LoadingPlaceName: Joi.string().max(20).optional().messages({
    'string.base': 'Loading Place Name must be a string.',
    'string.max': 'Loading Place Name cannot exceed 20 characters.',
  }),
  LeadLoadingApartment: Joi.string().max(200).optional().messages({
    'string.base': 'Lead Loading Apartment must be a string.',
    'string.max': 'Lead Loading Apartment cannot exceed 200 characters.',
  }),
  LeadLoadingNotes: Joi.string().optional().messages({
    'string.base': 'Lead Loading Notes must be a string.',
  }),
  LoadingAddress: Joi.string().max(50).optional().messages({
    'string.base': 'Loading Address must be a string.',
    'string.max': 'Loading Address cannot exceed 50 characters.',
  }),
  LoadingZip: Joi.string().max(10).optional().messages({
    'string.base': 'Loading Zip must be a string.',
    'string.max': 'Loading Zip cannot exceed 10 characters.',
  }),
  LoadingLat: Joi.string().max(10).optional().messages({
    'string.base': 'Loading Latitude must be a string.',
    'string.max': 'Loading Latitude cannot exceed 10 characters.',
  }),
  LoadingLong: Joi.string().max(10).optional().messages({
    'string.base': 'Loading Longitude must be a string.',
    'string.max': 'Loading Longitude cannot exceed 10 characters.',
  }),
  LoadingCity: Joi.string().max(20).required().messages({
    'string.base': 'Loading City must be a string.',
    'string.empty': 'Loading City cannot be empty.',
    'string.max': 'Loading City cannot exceed 20 characters.',
  }),
  LoadingState: Joi.string().max(20).optional().messages({
    'string.base': 'Loading State must be a string.',
    'string.max': 'Loading State cannot exceed 20 characters.',
  }),
  LoadingStairs: Joi.string().max(5).optional().messages({
    'string.base': 'Loading Stairs must be a string.',
    'string.max': 'Loading Stairs cannot exceed 5 characters.',
  }),
  LoadingNeedHelpPacking: Joi.string().length(1).optional().messages({
    'string.base': 'Loading Need Help Packing must be a string.',
    'string.length': 'Loading Need Help Packing must be 1 character long.',
  }),
  LoadingPackingDate: Joi.string().max(20).optional().messages({
    'string.base': 'Loading Packing Date must be a string.',
    'string.max': 'Loading Packing Date cannot exceed 20 characters.',
  }),
  LoadingPackingTime: Joi.string().max(20).optional().messages({
    'string.base': 'Loading Packing Time must be a string.',
    'string.max': 'Loading Packing Time cannot exceed 20 characters.',
  }),
  LoadingElevator: Joi.string().length(1).optional().messages({
    'string.base': 'Loading Elevator must be a string.',
    'string.length': 'Loading Elevator must be 1 character long.',
  }),
  LoadingGarage: Joi.string().length(1).optional().messages({
    'string.base': 'Loading Garage must be a string.',
    'string.length': 'Loading Garage must be 1 character long.',
  }),
  UnloadingDwellingSize: Joi.string().max(20).optional().messages({
    'string.base': 'Unloading Dwelling Size must be a string.',
    'string.max': 'Unloading Dwelling Size cannot exceed 20 characters.',
  }),
  UnloadingPlaceName: Joi.string().max(20).optional().messages({
    'string.base': 'Unloading Place Name must be a string.',
    'string.max': 'Unloading Place Name cannot exceed 20 characters.',
  }),
  UnloadingAddress: Joi.string().max(50).optional().messages({
    'string.base': 'Unloading Address must be a string.',
    'string.max': 'Unloading Address cannot exceed 50 characters.',
  }),
  LeadUnloadingApartment: Joi.string().max(200).optional().messages({
    'string.base': 'Lead Unloading Apartment must be a string.',
    'string.max': 'Lead Unloading Apartment cannot exceed 200 characters.',
  }),
  LeadUnloadingNotes: Joi.string().optional().messages({
    'string.base': 'Lead Unloading Notes must be a string.',
  }),
  UnloadingZip: Joi.string().max(10).optional().messages({
    'string.base': 'Unloading Zip must be a string.',
    'string.max': 'Unloading Zip cannot exceed 10 characters.',
  }),
  UnloadingLat: Joi.string().max(10).optional().messages({
    'string.base': 'Unloading Latitude must be a string.',
    'string.max': 'Unloading Latitude cannot exceed 10 characters.',
  }),
  UnloadingLong: Joi.string().max(10).optional().messages({
    'string.base': 'Unloading Longitude must be a string.',
    'string.max': 'Unloading Longitude cannot exceed 10 characters.',
  }),
  UnloadingCity: Joi.string().max(20).required().messages({
    'string.base': 'Unloading City must be a string.',
    'string.empty': 'Unloading City cannot be empty.',
    'string.max': 'Unloading City cannot exceed 20 characters.',
  }),
  UnloadingState: Joi.string().max(20).optional().messages({
    'string.base': 'Unloading State must be a string.',
    'string.max': 'Unloading State cannot exceed 20 characters.',
  }),
  UnloadingStairs: Joi.string().max(20).optional().messages({
    'string.base': 'Unloading Stairs must be a string.',
    'string.max': 'Unloading Stairs cannot exceed 20 characters.',
  }),
  UnloadingNeedHelpPacking: Joi.string().length(1).optional().messages({
    'string.base': 'Unloading Need Help Packing must be a string.',
    'string.length': 'Unloading Need Help Packing must be 1 character long.',
  }),
  UnloadingElevator: Joi.string().length(1).optional().messages({
    'string.base': 'Unloading Elevator must be a string.',
    'string.length': 'Unloading Elevator must be 1 character long.',
  }),
  ndLoadingDwellingSize: Joi.string().max(20).optional().messages({
    'string.base': '2nd Loading Dwelling Size must be a string.',
    'string.max': '2nd Loading Dwelling Size cannot exceed 20 characters.',
  }),
  ndLoadingPlaceName: Joi.string().max(100).optional().messages({
    'string.base': '2nd Loading Place Name must be a string.',
    'string.max': '2nd Loading Place Name cannot exceed 100 characters.',
  }),
  ndLoadingApartment: Joi.string().max(200).optional().messages({
    'string.base': '2nd Loading Apartment must be a string.',
    'string.max': '2nd Loading Apartment cannot exceed 200 characters.',
  }),
  ndLoadingAddress: Joi.string().max(50).optional().messages({
    'string.base': '2nd Loading Address must be a string.',
    'string.max': '2nd Loading Address cannot exceed 50 characters.',
  }),
  ndLoadingZip: Joi.string().max(10).optional().messages({
    'string.base': '2nd Loading Zip must be a string.',
    'string.max': '2nd Loading Zip cannot exceed 10 characters.',
  }),
  ndLoadingLat: Joi.string().max(10).optional().messages({
    'string.base': '2nd Loading Latitude must be a string.',
    'string.max': '2nd Loading Latitude cannot exceed 10 characters.',
  }),
  ndLoadingLong: Joi.string().max(10).optional().messages({
    'string.base': '2nd Loading Longitude must be a string.',
    'string.max': '2nd Loading Longitude cannot exceed 10 characters.',
  }),
  ndLoadingCity: Joi.string().max(10).optional().messages({
    'string.base': '2nd Loading City must be a string.',
    'string.max': '2nd Loading City cannot exceed 10 characters.',
  }),
  ndLoadingState: Joi.string().max(20).optional().messages({
    'string.base': '2nd Loading State must be a string.',
    'string.max': '2nd Loading State cannot exceed 20 characters.',
  }),
  ndLoadingStairs: Joi.string().max(5).optional().messages({
    'string.base': '2nd Loading Stairs must be a string.',
    'string.max': '2nd Loading Stairs cannot exceed 5 characters.',
  }),
  ndLoadingNeedHelpPacking: Joi.string().length(1).optional().messages({
    'string.base': '2nd Loading Need Help Packing must be a string.',
    'string.length': '2nd Loading Need Help Packing must be 1 character long.',
  }),
  ndLoadingPackingDate: Joi.string().max(20).optional().messages({
    'string.base': '2nd Loading Packing Date must be a string.',
    'string.max': '2nd Loading Packing Date cannot exceed 20 characters.',
  }),
  ndLoadingPackingTime: Joi.string().max(20).optional().messages({
    'string.base': '2nd Loading Packing Time must be a string.',
    'string.max': '2nd Loading Packing Time cannot exceed 20 characters.',
  }),
  ndLoadingElevator: Joi.string().length(1).optional().messages({
    'string.base': '2nd Loading Elevator must be a string.',
    'string.length': '2nd Loading Elevator must be 1 character long.',
  }),
  ndLoadingGarage: Joi.string().length(1).optional().messages({
    'string.base': '2nd Loading Garage must be a string.',
    'string.length': '2nd Loading Garage must be 1 character long.',
  }),
  ndLoadingNotes: Joi.string().optional().messages({
    'string.base': '2nd Loading Notes must be a string.',
  }),
  ndUnloadingDwellingSize: Joi.string().max(20).optional().messages({
    'string.base': '2nd Unloading Dwelling Size must be a string.',
    'string.max': '2nd Unloading Dwelling Size cannot exceed 20 characters.',
  }),
  ndUnloadingPlaceName: Joi.string().max(20).optional().messages({
    'string.base': '2nd Unloading Place Name must be a string.',
    'string.max': '2nd Unloading Place Name cannot exceed 20 characters.',
  }),
  ndUnloadingApartment: Joi.string().max(100).optional().messages({
    'string.base': '2nd Unloading Apartment must be a string.',
    'string.max': '2nd Unloading Apartment cannot exceed 100 characters.',
  }),
  ndUnloadingAddress: Joi.string().max(50).optional().messages({
    'string.base': '2nd Unloading Address must be a string.',
    'string.max': '2nd Unloading Address cannot exceed 50 characters.',
  }),
  ndUnloadingZip: Joi.string().max(10).optional().messages({
    'string.base': '2nd Unloading Zip must be a string.',
    'string.max': '2nd Unloading Zip cannot exceed 10 characters.',
  }),
  ndUnloadingLat: Joi.string().max(10).optional().messages({
    'string.base': '2nd Unloading Latitude must be a string.',
    'string.max': '2nd Unloading Latitude cannot exceed 10 characters.',
  }),
  ndUnloadingLong: Joi.string().max(10).optional().messages({
    'string.base': '2nd Unloading Longitude must be a string.',
    'string.max': '2nd Unloading Longitude cannot exceed 10 characters.',
  }),
  ndUnloadingCity: Joi.string().max(10).optional().messages({
    'string.base': '2nd Unloading City must be a string.',
    'string.max': '2nd Unloading City cannot exceed 10 characters.',
  }),
  ndUnloadingState: Joi.string().max(20).optional().messages({
    'string.base': '2nd Unloading State must be a string.',
    'string.max': '2nd Unloading State cannot exceed 20 characters.',
  }),
  ndUnloadingStairs: Joi.string().max(5).optional().messages({
    'string.base': '2nd Unloading Stairs must be a string.',
    'string.max': '2nd Unloading Stairs cannot exceed 5 characters.',
  }),
  ndUnloadingNeedHelpPacking: Joi.string().length(1).optional().messages({
    'string.base': '2nd Unloading Need Help Packing must be a string.',
    'string.length': '2nd Unloading Need Help Packing must be 1 character long.',
  }),
  ndUnloadingElevator: Joi.string().length(1).optional().messages({
    'string.base': '2nd Unloading Elevator must be a string.',
    'string.length': '2nd Unloading Elevator must be 1 character long.',
  }),
  ndLeadUnloadingNotes: Joi.string().optional().messages({
    'string.base': '2nd Lead Unloading Notes must be a string.',
  }),
  insert_time: Joi.date().optional().messages({
    'date.base': 'Insert Time must be a valid date.',
  }),
  distance: Joi.string().max(250).optional().messages({
    'string.base': 'Distance must be a string.',
    'string.max': 'Distance cannot exceed 250 characters.',
  }),
  lead_status: Joi.string().length(1).default("1").optional().messages({
    'string.base': 'Lead Status must be a string.',
    'string.length': 'Lead Status must be 1 character long.',
  }),
  book_date: Joi.string().max(20).optional().messages({
    'string.base': 'Book Date must be a string.',
    'string.max': 'Book Date cannot exceed 20 characters.',
  }),
  complete_date: Joi.string().max(20).optional().messages({
    'string.base': 'Complete Date must be a string.',
    'string.max': 'Complete Date cannot exceed 20 characters.',
  }),
  accept_status: Joi.number().integer().optional().messages({
    'number.base': 'Accept Status must be a number.',
    'number.integer': 'Accept Status must be an integer.',
  }),
  reject_reason: Joi.string().max(50).optional().messages({
    'string.base': 'Reject Reason must be a string.',
    'string.max': 'Reject Reason cannot exceed 50 characters.',
  }),
  company_id: Joi.number().integer().optional().messages({
    'number.base': 'Company ID must be a number.',
    'number.integer': 'Company ID must be an integer.',
  }),
});


