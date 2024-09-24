import { Column } from 'react-table';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { AdminUserRoles, Roles } from '../../common/constants';
import { InputField } from '../../common/InputField';
import { useEffect, useState } from 'react';
import { SelectOption } from '../../common/SelectOption';
import { getApiCall } from '../../services/api-service';

const userColumns: Column<any>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Username',
    accessor: 'username',
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Email ID',
    accessor: 'email_id',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone_no',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }: { value: string }) => (
      <span>
        {value === '1' ? 'Active' : value === '0' ? 'Inactive' : 'Unknown'}
      </span>
    ),
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: ({ value }: { value: string }) => (
      <span>{Roles.find((x) => x.id == value)?.role_name}</span>
    ),
  },
];

const roleDDL: any[] = [{Label:'', Value: ''},...Roles.filter(x=> AdminUserRoles.includes(x.id)).map((x: any) => {
  return {
    Label: x.role_name,
    Value: x.id,
  };
})];

const UsersLV = () => {
  const navigate = useNavigate();
  const actions = {
    // handleView: (row:any) => {
    //   navigate('/add-user');
    // },
    handleEdit: (row: any) => {
      navigate(`/edit-user/${row.id}`);
    },
    // handleDelete: () => {},
  };

  const handleButton = () => {
    navigate('/add-user');
  };
  const customButton = {
    buttonLabel: 'Add New',
    handleButton,
  };


  return (
    <>
      <Breadcrumb pageName="Users Management" />
      <PaginatedTable
        pagedApiUrl="/users/paged"
        columns={userColumns}
        actions={actions}
        customButton={customButton}
        extraQueryParams={{
          admin_users:true
        }}
        searchFormFields={
          <>
            <div className="mb-4.5">
              <InputField
                name="username"
                label="Username"
                type="text"
                required={false}
              />
            </div>

            <div className="mb-5.5">
              <InputField
                name="email_id"
                label="Email"
                type="text"
                required={false}
              />
            </div>

            <div className="mb-5.5">
              <InputField
                name="first_name"
                label="First Name"
                type="text"
                required={false}
              />
            </div>

            <div className="mb-5.5">
              <InputField
                name="phone_no"
                label="Phone Number"
                type="text"
                required={false}
              />
            </div>

            {roleDDL.length && (
              <div className="mb-5.5">
                <SelectOption
                  name="role"
                  label="Role"
                  required={false}
                  value={roleDDL}
                />
              </div>
            )}
          </>
        }
      />
    </>
  );
};

export default UsersLV;
