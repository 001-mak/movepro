import { Column } from 'react-table';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../services/api-service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const userColumns: Column<any>[] = [
  {
        Header: 'ID',
        accessor: 'id',
      },
      // {
      //   Header: 'User ID',
      //   accessor: 'user_id',
      // },
      // {
      //   Header: 'Provider ID',
      //   accessor: 'provider_id',
      // },
      {
        Header: 'Assigned To',
        accessor: 'assigned_to',
      },
      {
        Header: 'Lead ID',
        accessor: 'lead_id',
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
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Job Detail',
        accessor: 'JobDetail',
      },
      {
        Header: 'Job Type',
        accessor: 'JobType',
      },
      {
        Header: 'Service Type',
        accessor: 'ServiceType',
      },
      {
        Header: 'Desired Date',
        accessor: 'DesiredDate',
      },
      {
        Header: 'Desired Time',
        accessor: 'DesiredTime',
      },
      {
        Header: 'Move Date',
        accessor: 'MoveDate',
      },
      {
        Header: 'Move Time',
        accessor: 'MoveTime',
      },
      {
        Header: 'Estimated Date',
        accessor: 'EstimatedDate',
      },
      {
        Header: 'Estimated Time',
        accessor: 'EstimatedTime',
      },
      {
        Header: 'Insert Time',
        accessor: 'insert_time',
      },
      {
        Header: 'Distance',
        accessor: 'distance',
      },
      {
        Header: 'Lead Status',
        accessor: 'lead_status',
      },
      {
        Header: 'Book Date',
        accessor: 'book_date',
      },
      {
        Header: 'Complete Date',
        accessor: 'complete_date',
      },
      {
        Header: 'Accept Status',
        accessor: 'accept_status',
      },
      {
        Header: 'Reject Reason',
        accessor: 'reject_reason',
      },
      {
        Header: 'Assigned Date',
        accessor: 'assigned_date',
      },
    ];

const filterFields = [
  { id: 'email_id', label: 'Email' },
  { id: 'first_name', label: 'First Name' },
  { id: 'last_name', label: 'Last Name' },
  { id: 'phone_no', label: 'Phone Number' }
];

const AllLeads = () => {
  const navigate = useNavigate();
  const userState = useSelector((state: any) => state.auth.user);
   
  useEffect(() => {
    console.log("User" , userState.user_role)
}, []);
  

 

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
      <Breadcrumb pageName="All Leads" />
      <PaginatedTable
        pagedApiUrl="/leads"
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
export default AllLeads;