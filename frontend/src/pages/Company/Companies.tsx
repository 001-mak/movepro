import { Column } from 'react-table';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';

// Define the type for the fields



const userColumns: Column<any>[] = [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Company Name',
        accessor: 'company_name',
      },
      {
        Header: 'Company Email',
        accessor: 'company_email',
      },
      // {
      //   Header: 'Owner First Name',
      //   accessor: 'first_name',
      // },
      // {
      //   Header: 'Owner Last Name',
      //   accessor: 'last_name',
      // },
      // {
      //   Header: 'Owner Email',
      //   accessor: 'email_id',
      // },
      {
        Header: 'City',
        accessor: 'city',
      },
     
      
      {
        Header: 'Country',
        accessor: 'country',
      },
      
      
      {
        Header: 'Plan Purchased',
        accessor: 'subscription_plan_id',
      },
      // {
      //   Header: 'Plan Status',
      //   accessor: 'plan_purchased_status',
      //   Cell: ({ value }: { value: string }) => (
      //     <span>
      //       {value === '1' ? 'Active' : value === '0' ? 'Inactive' : 'Unknown'}
      //     </span>
      //   ),
      // },
    ];

const filterFields = [
  { id: 'company_email', label: 'Email' },
  // { id: 'first_name', label: 'First Name' },
  // { id: 'last_name', label: 'Last Name' },
  // { id: 'phone_no', label: 'Phone Number' }
];

const Companies = () => {
  const navigate = useNavigate();

  const actions = {
    handleView: (id: any) => {
      navigate(`/view-company/${id}`);
    },
    handleEdit: (id: any) => {
      navigate(`/edit-company/${id}`);
    },
    handleDelete: () => { },
  };

  const handleButton = () => {
    navigate('/add-company');
  };

  // const customButton = {
  //   buttonLabel: 'Add New',
  //   handleButton,
  // };

  return (
    <>
      <Breadcrumb pageName="Companies" />
      <PaginatedTable
        pagedApiUrl="/companies"
        columns={userColumns}
        actions={actions}
        // customButton={customButton}
        filterFields={filterFields}
        
      />
    </>
  );
};
export default Companies;