import { Column } from 'react-table';
import { Company } from '../../interface/interfaces';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';

// table header
const columns: Column<Company>[] = [
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
  {
    Header: 'Owner First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Owner Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Owner Email',
    accessor: 'email_id',
  },
  {
    Header: 'City',
    accessor: 'city',
  },
  {
    Header: 'State',
    accessor: 'state',
  },
  {
    Header: 'ZIP',
    accessor: 'zip',
  },
  {
    Header: 'Country',
    accessor: 'country',
  },
  {
    Header: 'Website',
    accessor: 'website',
  },
  {
    Header: 'Tax ID',
    accessor: 'tax_id',
  },
  {
    Header: 'Plan Purchased',
    accessor: 'plan_purchased',
  },
  {
    Header: 'Plan Status',
    accessor: 'plan_purchased_status',
    Cell: ({ value }: { value: string }) => (
      <span>
        {value === '1' ? 'Active' : value === '0' ? 'Inactive' : 'Unknown'}
      </span>
    ),
  },
];

const Companies = () => {
  const navigate = useNavigate();
  const actions = {
    handleView: (row:any) => {

      navigate(`/view-company/${row.id}`);
    },
    handleEdit: (row:any) => {
      navigate(`/edit-company/${row.id}`);
    },
    handleDelete: () => {},
  };

  const handleButton = () => {
    navigate('/add-company');
  };
  
  const customButton = {
    buttonLabel: 'Add New',
    handleButton,
  };
  return (
    <>
      <Breadcrumb pageName="Companies" />
      <PaginatedTable
        pagedApiUrl="/companies/paged"
        columns={columns}
        actions={actions}
        customButton={customButton}
      />
    </>
  );
};

export default Companies;
