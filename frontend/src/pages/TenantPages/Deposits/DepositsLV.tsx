import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Column } from 'react-table';
import PaginatedTable from '../../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../../services/api-service';
import { toast } from 'react-toastify';
import { Deposit } from '../../../interface/interfaces';


function DepositsLV() {
  const navigate = useNavigate();
  const actions = {
    handleEdit: (row: any) => {
      navigate(`/edit-deposit/${row.id}`);
    },
    handleDelete: async (row: any) => {
      try {
        await deleteApiCall(`/deposits/${row.id}`)
        toast.success("Record Deleted Successfully");
        navigate(0)
      } catch (error) {
        toast.error("Could not delete record");
      }
    },
  };

  const handleButton = () => {
    navigate('/add-deposit');
  };

  const columns: Column<Deposit>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'deposit_name',
    },
    {
      Header: 'Description',
      accessor: 'deposit_description',
    },
    {
      Header: 'Price',
      accessor: 'deposit_price',
    }
  ];

  return (
    <div>
      <Breadcrumb pageName="Deposit Management" />
      <PaginatedTable
        pagedApiUrl="/deposits/paged"
        columns={columns}
        actions={actions}
        customButton={{ buttonLabel: 'Add New', handleButton }}
      ></PaginatedTable>
    </div>
  );
}

export default DepositsLV;
