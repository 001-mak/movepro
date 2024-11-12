import { Column } from 'react-table';
import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import CheckboxOne from '../../components/Checkboxes/CheckboxOne';

// Define the type for the fields
type SelectedFields = {
  email_id: boolean;
  first_name: boolean;
  phone_no: boolean;
};

// Define valid field names
type FieldNames = keyof SelectedFields;

const userColumns: Column<any>[] = [
  {
    Header: 'ID',
    accessor: 'id',
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
    Header: 'User Role',
    accessor: 'user_role',
  },
];

const UsersLV = () => {
  const navigate = useNavigate();
  const [selectedFields, setSelectedFields] = useState<SelectedFields>({
    email_id: false,
    first_name: false,
    phone_no: false
  });

  const handleCheckboxChange = (field: FieldNames) => {
    setSelectedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const actions = {
    handleView: (row: any) => {
      navigate('/add-user');
    },
    handleEdit: (row: any) => {
      navigate(`/edit-user/${row.id}`);
    },
    handleDelete: () => { },
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
        pagedApiUrl="/users"
        columns={userColumns}
        actions={actions}
        customButton={customButton}
        extraQueryParams={{
          admin_users: true,
          ...selectedFields
        }}
        searchFormFields={
          <div className="space-y-4">
            <CheckboxOne
              id="email_id"
              checked={selectedFields.email_id}
              onChange={() => handleCheckboxChange('email_id')}
              label="Email"
            />
            <CheckboxOne
              id="first_name"
              checked={selectedFields.first_name}
              onChange={() => handleCheckboxChange('first_name')}
              label="First Name"
            />
            <CheckboxOne
              id="phone_no"
              checked={selectedFields.phone_no}
              onChange={() => handleCheckboxChange('phone_no')}
              label="Phone Number"
            />
          </div>
        }
      />
    </>
  );
};
export default UsersLV;