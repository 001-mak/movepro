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


export interface ITruck {
  company_id: number;
  rented: boolean; 
  make: string;
  model: string;
  year_of_manufacture: number;
  vin: string; // Unique
  license_plate_number: string;
  license_plate_state_province: string;
  truck_type: string;
  truck_capacity?: string;
  owner_name: string;
  lease_details?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  fuel_efficiency?: string;
  tare_weight?: string; // Empty truck weight
  payload_capacity?: string;
  volume: string;
  last_maintenance_date?: Date;
  next_maintenance_date?: Date;
  dot_compliance_number?: string; // USA-specific
  cvor_number?: string; // Canada-specific
  cargo_restrictions?: string;
  vehicle_notes?: string;
  special_permits?: string;
}
