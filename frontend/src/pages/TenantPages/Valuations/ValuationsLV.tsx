import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Column } from 'react-table';
import PaginatedTable from '../../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../../services/api-service';
import { toast } from 'react-toastify';
import { Valuation } from '../../../interface/interfaces';


function ValuationsLV() {
  const navigate = useNavigate();
  const actions = {
    handleEdit: (row: any) => {
      navigate(`/edit-valuation/${row.id}`);
    },
    handleDelete: async (row: any) => {
      try {
        await deleteApiCall(`/valuations/${row.id}`)
        toast.success("Record Deleted Successfully");
        navigate(0)
      } catch (error) {
        toast.error("Could not delete record");
      }
    },
  };

  const handleButton = () => {
    navigate('/add-valuation');
  };

  const columns: Column<Valuation>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'valuation_name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Storage',
      accessor: 'storage',
    },
    {
      Header: 'Coverage Per item lb/kg',
      accessor: 'item_lb_kg',
    },
    {
      Header: 'Deductable',
      accessor: 'deductable',
    },
    {
      Header: 'Maximum Rate (Limit)',
      accessor: 'maximum_rate',
    },
    {
      Header: 'Cost',
      accessor: 'cost',
    }
  ];

  return (
    <div>
      <Breadcrumb pageName="Full Value Protection" />
      <PaginatedTable
        pagedApiUrl="/valuations/paged"
        columns={columns}
        actions={actions}
        customButton={{ buttonLabel: 'Add New', handleButton }}
      ></PaginatedTable>
    </div>
  );
}

export default ValuationsLV;
