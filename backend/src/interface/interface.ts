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

// type Role = "SUPER_ADMIN" | "TENANT_ADMIN" | "DRIVER" | "CREW";

// export interface IUserRole {
//   1: Role;
//   2: Role;
//   3: Role;
//   4: Role;
// }

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
  company_id?: number;
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
  UnloadingCity?: string; // Optional
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

// export interface InventoryGroupItem {
//   id: number;
//   item_name: string;
//   item_size: string;
//   group_id: number;
// }