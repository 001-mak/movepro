export enum RoleEnum {
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

export const AdminUserRoles = [RoleEnum.SuperAdmin, RoleEnum.SubAdmin,
RoleEnum.SalesAdmin, RoleEnum.SupportAdmin, RoleEnum.FinancialAdmin];

export const TenantUserRoles = [RoleEnum.TenantAdmin, RoleEnum.TenantManager,
RoleEnum.Sales, RoleEnum.Driver, RoleEnum.Mover];

export const Roles: any[] = [
    {
        "id": '1',
        "role_name": "Super Admin"
    },
    {
        "id": '2',
        "role_name": "Sub Admin"
    },
    {
        "id": '3',
        "role_name": "Sales Admin"
    },
    {
        "id": '4',
        "role_name": "Support Admin"
    },
    {
        "id": '5',
        "role_name": "Financial Admin"
    },
    {
        "id": '6',
        "role_name": "Tenant Admin"
    },
    {
        "id": '7',
        "role_name": "Tenant Manager"
    },
    {
        "id": '8',
        "role_name": "Sales"
    },
    {
        "id": '9',
        "role_name": "Driver"
    },
    {
        "id": '10',
        "role_name": "Mover"
    }
]

export const routePermissions:any = {
    '/': [
        ...AdminUserRoles, ...TenantUserRoles
    ],
    '/companies': [RoleEnum.SuperAdmin, RoleEnum.SubAdmin],
    '/view-company/:id': [RoleEnum.SuperAdmin, RoleEnum.SubAdmin],
    '/add-company': [RoleEnum.SuperAdmin, RoleEnum.SubAdmin],
    '/edit-company/:id': [RoleEnum.SuperAdmin, RoleEnum.SubAdmin],
    '/company-users': [RoleEnum.SuperAdmin, RoleEnum.SubAdmin],
    '/all-leads': [
        RoleEnum.SuperAdmin, RoleEnum.SubAdmin,
        RoleEnum.SalesAdmin
    ],
    '/view-lead/:id': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SalesAdmin
    ],
    '/users': [
        RoleEnum.SuperAdmin, RoleEnum.SubAdmin, 
        RoleEnum.SubAdmin
    ],
    '/add-user': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SubAdmin
    ],
    '/edit-user/:id': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SubAdmin
    ],
    '/payments': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.FinancialAdmin
    ],
    '/view-transaction/:id': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.FinancialAdmin
    ],
    '/packages': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SalesAdmin
    ],
    '/add-package': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SalesAdmin
    ],
    '/edit-package/:id': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SalesAdmin
    ],
    '/support': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SupportAdmin
    ],
    '/emailtemplates': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SupportAdmin
    ],
    '/edit-emailtemplate/:id': [
        RoleEnum.SuperAdmin,  RoleEnum.SubAdmin,
        RoleEnum.SupportAdmin
    ],
    '/calendar': [
        RoleEnum.SuperAdmin,
        RoleEnum.SubAdmin, 
        RoleEnum.SalesAdmin, 
        RoleEnum.SupportAdmin, 
        RoleEnum.FinancialAdmin
    ],
    '/my-profile': [
        ...AdminUserRoles, ...TenantUserRoles
    ],
    // Tenant Routes Start
    '/materials': [
        ...TenantUserRoles
    ],
    '/add-material': [
        ...TenantUserRoles
    ],
    '/edit-material/:id': [
        ...TenantUserRoles
    ],
    '/deposits': [
        ...TenantUserRoles
    ],
    '/add-deposit': [
        ...TenantUserRoles
    ],
    '/edit-deposit/:id': [
        ...TenantUserRoles
    ],
    '/discounts': [
        ...TenantUserRoles
    ],
    '/add-discount': [
        ...TenantUserRoles
    ],
    '/edit-discount/:id': [
        ...TenantUserRoles
    ],
    '/additionalservices': [
        ...TenantUserRoles
    ],
    '/add-additionalservice': [
        ...TenantUserRoles
    ],
    '/edit-additionalservice/:id': [
        ...TenantUserRoles
    ],
    '/valuations': [
        ...TenantUserRoles
    ],
    '/add-valuation': [
        ...TenantUserRoles
    ],
    '/edit-valuation/:id': [
        ...TenantUserRoles
    ],
    // Tenant Routes End

};
  

export const checkPermission = (userRole: string) => {
    const allowedRoles = ['super_admin', 'tenant_admin', 'driver']
    return allowedRoles.includes(userRole);
};

export const RECORD_SAVED_SUCCESS= "Record Saved Successfully";
export const RECORD_UPDATED_SUCCESS= "Record Updated Successfully";
export const RECORD_DELETED_SUCCESS= "Record Deleted Successfully";
export const ERROR_MESSAGE= "Error";
export const PASSWORD_MISMATCH_ERROR_MESSAGE= "Password is not matching";