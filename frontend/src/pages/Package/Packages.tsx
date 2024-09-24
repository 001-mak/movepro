import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Column } from 'react-table';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../services/api-service';
import { toast } from 'react-toastify';
import { Package } from '../../interface/interfaces';



function Packages() {
  const navigate = useNavigate();
  const actions = {
    handleEdit: (row: any) => {
      navigate(`/edit-package/${row.id}`);
    },
    handleDelete: async (row: any) => {
      try {
        await deleteApiCall(`/packages/${row.id}`)
        toast.success("Record Deleted Successfully");
        navigate(0)
      } catch (error) {
        toast.error("Could not delete record");
      }
    },
  };

  const handleButton = () => {
    navigate('/add-package');
  };

  const columns: Column<Package>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Package',
      accessor: 'package',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: 'Month',
      accessor: 'monthly',
    },
    {
      Header: 'Users Limit',
      accessor: 'users_limit',
    },
    {
      Header: 'Leads Limit',
      accessor: 'leads_limit',
    },
    {
      Header: 'SMS Limit',
      accessor: 'sms_limit',
    },
    {
      Header: 'Email Limit',
      accessor: 'email_limit',
    },
  ];

  return (
    <div>
      <Breadcrumb pageName="Package Management" />
      <PaginatedTable
        pagedApiUrl="/packages/paged"
        columns={columns}
        actions={actions}
        customButton={{ buttonLabel: 'Add New', handleButton }}
      ></PaginatedTable>
    </div>
  );
}

export default Packages;
