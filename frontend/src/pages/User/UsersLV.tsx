import { Column } from 'react-table';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../services/api-service';
import { toast } from 'react-toastify';
// Define the type for the fields



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

const filterFields = [
  { id: 'email_id', label: 'Email' },
  { id: 'first_name', label: 'First Name' },
  { id: 'last_name', label: 'Last Name' },
  { id: 'phone_no', label: 'Phone Number' }
];

const UsersLV = () => {
  const navigate = useNavigate();
  

 

  const actions = {
    handleView: (id: any) => {
      navigate(`/view-user/${id}`);
    },
    // handleEdit: (row: any) => {
    //   navigate(`/edit-user/${row.id}`);
    // },
    handleDelete: async (id: any) => {
      console.log(id)
      try {
        await deleteApiCall(`/users/${id}`);
       
        toast.success('User deleted successfully', { autoClose: 2000 });
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // Optionally, refresh data or update UI here
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    },
  };

  

  

  return (
    <>
      <Breadcrumb pageName="Users Management" />
      <PaginatedTable
        pagedApiUrl="/users"
        columns={userColumns}
        actions={actions}
        // customButton={customButton}
        filterFields={filterFields}
        extraQueryParams={{
          admin_users: true
        }}
      />
    </>
  );
};
export default UsersLV;