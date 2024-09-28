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
    username: string;
    email: string;
    phone: string;
    company: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    packageplan:number;
}

export interface IUserSignUpCredentials {
    username: string;
    email: string;
    password: string;
}



export type UserLoginCredentials = Omit<IUserSignUpCredentials, 'email'>;


export interface CreateLead {
  user_id: number;
  provider_id: number;
  assigned_to: number;
  lead_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  comments: string;
  JobDetail: string;
  JobType: string;
  ServiceType: string;
  DesiredDate: string;
  DesiredTime: string;
  MoveDate: string;
  MoveTime: string;
  EstimatedDate: string;
  EstimatedTime: string;
  LoadingDwellingSize: string;
  LoadingPlaceName: string;
  LeadLoadingApartment: string;
  LeadLoadingNotes: string;
  LoadingAddress: string;
  LoadingZip: string;
  LoadingLat: string;
  LoadingLong: string;
  LoadingCity: string;
  LoadingState: string;
  LoadingStairs: string;
  LoadingNeedHelpPacking: string;
  LoadingPackingDate: string;
  LoadingPackingTime: string;
  LoadingElevator: string;
  LoadingGarage: string;
  UnloadingDwellingSize: string;
  UnloadingPlaceName: string;
  UnloadingAddress: string;
  LeadUnloadingApartment: string;
  LeadUnloadingNotes: string;
  UnloadingZip: string;
  UnloadingLat: string;
  UnloadingLong: string;
  UnloadingCity: string;
  UnloadingState: string;
  UnloadingStairs: string;
  UnloadingNeedHelpPacking: string;
  UnloadingElevator: string;
  secLoadingDwellingSize: string;
  secLoadingPlaceName: string;
  secLoadingApartment: string;
  secLoadingAddress: string;
  secLoadingZip: string;
  secLoadingLat: string;
  secLoadingLong: string;
  secLoadingCity: string;
  secLoadingState: string;
  secLoadingStairs: string;
  secLoadingNeedHelpPacking: string;
  secLoadingPackingDate: string;
  secLoadingPackingTime: string;
  secLoadingElevator: string;
  secLoadingGarage: string;
  secLoadingNotes: string;
  secUnloadingDwellingSize: string;
  secUnloadingPlaceName: string;
  secUnloadingApartment: string;
  secUnloadingAddress: string;
  secUnloadingZip: string;
  secUnoadingLat: string;
  secUnoadingLong: string;
  secUnloadingCity: string;
  secUnloadingState: string;
  secUnloadingStairs: string;
  secUnloadingNeedHelpPacking: string;
  secUnloadingElevator: string;
  secLeadUnloadingNotes: string;
  LeadStop1: string;
  LeadStop2: string;
  LeadStop3: string;
  unique_id: string;
  insert_time: Date;
  distance: string;
  lead_status: string;
  book_date?: string;
  complete_date?: string;
  accept_status: number;
  reject_reason: string;
  assigned_date?: Date;
}

export interface Lead extends CreateLead{
  id: number;
}
