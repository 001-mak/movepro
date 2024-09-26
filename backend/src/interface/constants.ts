import { Role } from "./interface";

export enum UserStatus {
    INACTIVE = '0',
    ACTIVE = '1'
}

export enum UserRole {
    INACTIVE = 0,
    ACTIVE = 1
}

export enum UserRoleEnum {
    SuperAdmin = '1',
    SubAdmin = '2',
    SalesAdmin = '3',
    SupportAdmin = '4',
    FinancialAdmin = '5',
    TenantAdmin = '6',
    TenantManager = '7',
    Sales = '8',
    Driver = '9',
    Mover = '10'
}

export const AdminUserRoles = [UserRoleEnum.SuperAdmin, UserRoleEnum.SubAdmin,
UserRoleEnum.SalesAdmin, UserRoleEnum.SupportAdmin, UserRoleEnum.FinancialAdmin];

export const TenantUserRoles = [UserRoleEnum.TenantAdmin, UserRoleEnum.TenantManager,
UserRoleEnum.Sales, UserRoleEnum.Driver, UserRoleEnum.Mover];

export const roles: Role[] = [
    {
        "id": UserRoleEnum.SuperAdmin,
        "role_name": "Super Admin"
    },
    {
        "id": UserRoleEnum.SubAdmin,
        "role_name": "Sub Admin"
    },
    {
        "id": UserRoleEnum.SalesAdmin,
        "role_name": "Sales Admin"
    },
    {
        "id": UserRoleEnum.SupportAdmin,
        "role_name": "Support Admin"
    },
    {
        "id": UserRoleEnum.FinancialAdmin,
        "role_name": "Financial Admin"
    },
    {
        "id": UserRoleEnum.TenantAdmin,
        "role_name": "Tenant Admin"
    },
    {
        "id": UserRoleEnum.TenantManager,
        "role_name": "Tenant Manager"
    },
    {
        "id": UserRoleEnum.Sales,
        "role_name": "Sales"
    },
    {
        "id": UserRoleEnum.Driver,
        "role_name": "Driver"
    },
    {
        "id": UserRoleEnum.Mover,
        "role_name": "Mover"
    }
]