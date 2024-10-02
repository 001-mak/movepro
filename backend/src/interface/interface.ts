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
