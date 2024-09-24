
export interface CreateLead {
    company_id: number;
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

export interface Subscriber{
    username: string;
    email_id: string;
    packagePayment: number;
    status: string;
}

export interface Company {
  id: number;
  user_id: number;
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
  slogan: string;
  tax_id: string;
  us_dot: string;
  company_mc: string;
  minimum_hour: string;
  social_pin: string;
  plan_purchased: number;
  plan_purchased_status: string;
  publish_key: string;
  secret_key: string;

  first_name?:string;
  last_name?:string;
  email_id?:string;
}


export interface Subadmin{
    username:string,
    name:string,
    email:string,
    phoneNumber: string,
}
  
export interface User {
  id: number;
  username: string;
  password: string;
  salt: string;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_no: string;
  alter_phone_no: string | null;
  picture: string | null;
  bio: string | null;
  cover_photo: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  status: string;
  role: string;
  added_by: number | null;
  validation_id: string | null;
  reset_key: string | null;
  join_date: Date;
  ssn: string | null;
  hire_date: Date | null;
  starting_pay: string | null;
  current_pay: string | null;
  eligible_sales: number | null;
  lead_commision: string | null;
  annual_sale: string | null;
  lifetime_sale: string | null;
  lifetime_commision: string | null;
  employee_type: number | null;
  notes: string | null;
  Agreement: string | null;
  signature: string | null;
  company_id: number | null;
  
  // Relationships
  // lead_square_transaction: LeadSquareTransaction[];
  // square_transaction: SquareTransaction[];
  // tbl_additional_services: TblAdditionalService[];
  // tbl_deposit: TblDeposit[];
  // tbl_support: TblSupport[];
  // tbl_support_reply: TblSupportReply[];
  // tbl_company: TblCompany | null;

  //optional
  confirmpassword?: string | null;
}

  export interface SquareTransaction {
    id: number;
    package_price?: string;
    package?: string;
    package_id?: string;
    payment_id?: string;
    payment_status?: string;
    delay_duration?: string;
    source_type?: string;
    amount?: string;
    currency?: string;
    card_status?: string;
    card_brand?: string;
    last_4?: string;
    exp_month?: string;
    exp_year?: string;
    fingerprint?: string;
    card_type?: string;
    bin?: string;
    entry_method?: string;
    cvv_status?: string;
    avs_status?: string;
    statement_description?: string;
    location_id?: string;
    order_id?: string;
    total_amount?: string;
    receipt_number?: string;
    receipt_url?: string;
    delay_action?: string;
    delayed_until?: string;
    created_at?: string;
    updated_at?: string;
    company_id: number;
    tbl_company?: Company;
  }
  

  export interface SupportTicket {
    id: number;
    sender_id: number;
    subject: string;
    issues: string;
    time_created: Date;
    status: string;
    tbl_user: User;
    tbl_support_reply: SupportTicketReply[];
  }
  
  export interface SupportTicketReply {
    id: number;
    support_id: number;
    sender_id: number;
    reply: string;
    time_created: Date;
    tbl_user: User;
    tbl_support: SupportTicket;
  }
  
  export interface EmailTemplate {
    id: number;
    code: string;
    template: string;
    content: string;
    created_at: Date;
  }

  export interface CreatePackage {
    title?: string;
    sub_title?: string;
    code?: string;
    package: string;
    price: string;
    monthly?: string;
    users_limit?: number;
    leads_limit?: number;
    text3?: string;
    text4?: string;
    sms_limit?: number;
    email_limit?: string;
    text6?: string;
    button?: string;
    link?: string;
    type?: string;
  }
  
  export interface Package extends CreatePackage{
    id: number;
    status: number;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface Material {
    id: number;
    material_name: string;
    material_description?: string;
    material_price: number;
    company_id: number;
  }

  export interface Deposit {
    id: number;
    deposit_name: string;
    deposit_description?: string;
    deposit_price: number;
    company_id: number;
  }

  export interface Discount {
    id: number;
    discount_name: string;
    discount_description?: string;
    discount_price: number;
    discount_type: number;
    company_id: number;
  }

  export interface AdditionalService {
    id: number;
    name: string;
    description?: string;
    cost: number;
    company_id: number;
  }

  export interface Valuation {
    id: number;
    valuation_name: string;
    description?: string | null;
    item_lb_kg: string;
    storage?: string | null;
    maximum_rate: number;
    deductable: number;
    cost: number;
    company_id: number;
  }

  
export interface InventoryGroup {
  id: number;
  group_name: string;
  company_id: number;
}

export interface InventoryGroupItem {
  id: number;
  item_name: string;
  item_size: string;
  group_id: number;
}