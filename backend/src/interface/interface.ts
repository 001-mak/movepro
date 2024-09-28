import type { NextFunction, Request, Response } from 'express';
import type { DeepPartial } from 'utility-types';

export type TypedRequest<
  ReqBody = Record<string, unknown>,
  QueryString = Record<string, unknown>
> = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  DeepPartial<ReqBody>,
  DeepPartial<QueryString>
>

export interface Role {
    id: string,
    role_name: string,
    // can_access: string,
    // role_order: number
  }

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
    company_name:string;
}

export interface IUserLogin {
  email_id: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: any; // You can define a more specific type if needed
}

export interface IUserSignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export type UserLoginCredentials = Omit<IUserSignUpCredentials, 'email'>;
