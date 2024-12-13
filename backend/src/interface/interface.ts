import type { NextFunction, Request, Response } from "express";
import type { DeepPartial } from "utility-types";

export type TypedRequest<
  ReqBody = Record<string, unknown>,
  QueryString = Record<string, unknown>
> = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  DeepPartial<ReqBody>,
  DeepPartial<QueryString>
>;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export interface IUserRegister {
  password: string;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_no: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  company_name: string;
  ssn: string;
}

export interface IUserLogin {
  email_id: string;
  password: string;
}





export interface AuthRequest extends Request {
  user?: any; // You can define a more specific type if needed
}

export interface IUser {
  email_id: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_no: string;
  picture?: string;
  bio?: string;
  cover_photo?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  ssn: string;
  user_role?: string;
  hire_date?: string;
  current_pay?: string;
}

export interface ITokenData {
  id: number;                // User ID
  first_name: string;       // User's first name
  last_name: string;        // User's last name
  email_id: string;         // User's email ID
  user_role: string;        // User's role (e.g., SUPER_ADMIN, TENANT_ADMIN, etc.)
  company_id?: number; // Optional company ID (can be null)
}


export interface Lead {
  first_name: string; // Required
  last_name: string;  // Required
  phone: string;      // Required
  email: string;      // Required
  comments?: string;  // Optional
  JobType: string;    // Required
  ServiceType?: string; // Optional
  MoveDate: string;   // Required
  MoveTime: string;   // Required
  LoadingCity: string; // Required
  EstimatedDate?: string; // Optional
  EstimatedTime?: string; // Optional
  LoadingDwellingSize?: string; // Optional
  LoadingPlaceName?: string; // Optional
  LeadLoadingApartment?: string; // Optional
  LeadLoadingNotes?: string; // Optional
  LoadingAddress?: string; // Optional
  LoadingZip?: string; // Optional
  LoadingLat?: string; // Optional
  LoadingLong?: string; // Optional
  LoadingState?: string; // Optional
  LoadingStairs?: string; // Optional
  LoadingNeedHelpPacking?: string; // Optional
  LoadingPackingDate?: string; // Optional
  LoadingPackingTime?: string; // Optional
  LoadingElevator?: string; // Optional
  LoadingGarage?: string; // Optional
  UnloadingDwellingSize?: string; // Optional
  UnloadingPlaceName?: string; // Optional
  UnloadingAddress?: string; // Optional
  LeadUnloadingApartment?: string; // Optional
  LeadUnloadingNotes?: string; // Optional
  UnloadingZip?: string; // Optional
  UnloadingLat?: string; // Optional
  UnloadingLong?: string; // Optional
  UnloadingCity: string; // Optional
  UnloadingState?: string; // Optional
  UnloadingStairs?: string; // Optional
  UnloadingNeedHelpPacking?: string; // Optional
  UnloadingElevator?: string; // Optional
  ndLoadingDwellingSize?: string; // Optional
  ndLoadingPlaceName?: string; // Optional
  ndLoadingApartment?: string; // Optional
  ndLoadingAddress?: string; // Optional
  ndLoadingZip?: string; // Optional
  ndLoadingLat?: string; // Optional
  ndLoadingLong?: string; // Optional
  ndLoadingCity?: string; // Optional
  ndLoadingState?: string; // Optional
  ndLoadingStairs?: string; // Optional
  ndLoadingNeedHelpPacking?: string; // Optional
  ndLoadingPackingDate?: string; // Optional
  ndLoadingPackingTime?: string; // Optional
  ndLoadingElevator?: string; // Optional
  ndLoadingGarage?: string; // Optional
  ndLoadingNotes?: string; // Optional
  ndUnloadingDwellingSize?: string; // Optional
  ndUnloadingPlaceName?: string; // Optional
  ndUnloadingApartment?: string; // Optional
  ndUnloadingAddress?: string; // Optional
  ndUnloadingZip?: string; // Optional
  ndUnloadingLat?: string; // Optional
  ndUnloadingLong?: string; // Optional
  ndUnloadingCity?: string; // Optional
  ndUnloadingState?: string; // Optional
  ndUnloadingStairs?: string; // Optional
  ndUnloadingNeedHelpPacking?: string; // Optional
  ndUnloadingElevator?: string; // Optional
  ndLeadUnloadingNotes?: string; // Optional
  distance?: string; // Optional
  lead_status?: string; // Optional
  book_date?: string; // Optional
  complete_date?: string; // Optional
  accept_status?: number; // Optional
  reject_reason?: string; // Optional
  company_id?: number; // Optional
}

// export interface Lead extends CreateLead{
//   id: number;
// }

export interface PagedQuery{
  pageIndex: string;
  pageSize: string;
  orderBy: string;
  orderDirection: string;

}

export interface InventoryGroup {
  group_name: string;
  company_id: number;
}

export interface InventoryGroupItem {
  item_name: string;
  item_size: string;
  group_id?: number;
}


export interface Material {
  material_name: string;
  material_description?: string;
  material_price: number;
  company_id: number;
}
export interface ITruck {
  rented: boolean | null; // Represents BIT(1), can be true, false, or null
  make: string; // Required
  model: string; // Required
  year_of_manufacture: number; // Required
  vin: string; // Unique, Required
  license_plate_number: string; // Required
  license_plate_state_province: string; // Required
  truck_type: string; // Required
  truck_capacity?: string | null; // Optional
  owner_name: string; // Required
  lease_details?: string | null; // Optional (TEXT)
  insurance_provider?: string | null; // Optional
  insurance_policy_number?: string | null; // Optional
  fuel_efficiency?: string | null; // Optional
  tare_weight?: string | null; // Optional
  payload_capacity?: string | null; // Optional
  volume: string; // Required
  last_maintenance_date?: Date | null; // Optional
  next_maintenance_date?: Date | null; // Optional
  dot_compliance_number?: string | null; // Optional
  cvor_number?: string | null; // Optional
  cargo_restrictions?: string | null; // Optional (TEXT)
  vehicle_notes?: string | null; // Optional (TEXT)
  special_permits?: string | null; // Optional (TEXT)
  driver_id?: number | null; // Foreign Key, Optional
}


export interface ICompany {
  company_name: string;
  company_email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  company_logo: string;
  website: string;
  social_fb: string;
  social_tw: string;
  social_in: string;
  social_insta: string;
  social_tube: string;
  user_id: number;
  subscription_plan_id?: number;
}

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
  profilePictureBase64?: string;
}