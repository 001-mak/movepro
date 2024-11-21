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
       
      const actions: any = {
        handleView: (id: any) => {
          navigate(`/view-lead/${id}`);
        },
      };
    
      // Conditionally add edit and delete functions based on user role
      if (userState.user_role === 'tenant_admin') {
        actions.handleEdit = (row: any) => {
          navigate(`/edit-lead/${row.id}`);
        };
        actions.handleDelete = async (id: any) => {
          try {
            console.log("Delete")
            await deleteApiCall(`/leads/${id}`);
            toast.success('Deleted successfully', { autoClose: 2000 });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.error('Error deleting Lead:', error);
            toast.error('Failed to delete Lead');
          }
        };
      }
    
      const handleAddNewLead = () => {
        navigate('/add-lead');
      };
    
      // Conditionally set up custom button and extra props
      const tableProps: any = {
        pagedApiUrl: userState.user_role === 'tenant_admin' 
          ? `/leads` 
          : '/leads',
        columns: userColumns,
        actions: actions,
        filterFields: filterFields
      };
    
      // Add custom button only for tenant_admin
      if (userState.user_role === 'tenant_admin') {
        tableProps.customButton = {
          buttonLabel: 'Add New',
          handleButton: handleAddNewLead
        };
      }
    
      // Add extra query params only for super_admin
      if (userState.user_role === 'super_admin') {
        tableProps.extraQueryParams = {
          admin_users: true
        };
      }
    
      return (
        <>
          <Breadcrumb pageName="All Leads" />
          <PaginatedTable 
  {...tableProps} 
  actions={actions}  // Ensure actions are passed
/>
        </>
      );
    };
    
    export default AllLeads;