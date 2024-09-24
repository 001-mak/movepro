import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Column } from 'react-table';
import PaginatedTable from '../../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../../services/api-service';
import { toast } from 'react-toastify';
import { AdditionalService } from '../../../interface/interfaces';


function AdditionalServicesLV() {
  const navigate = useNavigate();
  const actions = {
    handleEdit: (row: any) => {
      navigate(`/edit-additionalservice/${row.id}`);
    },
    handleDelete: async (row: any) => {
      try {
        await deleteApiCall(`/additionalservices/${row.id}`)
        toast.success("Record Deleted Successfully");
        navigate(0)
      } catch (error) {
        toast.error("Could not delete record");
      }
    },
  };

  const handleButton = () => {
    navigate('/add-additionalservice');
  };

  const columns: Column<AdditionalService>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Cost',
      accessor: 'cost',
    }
  ];

  return (
    <div>
      <Breadcrumb pageName="Additional Service Management" />
      <PaginatedTable
        pagedApiUrl="/additionalservices/paged"
        columns={columns}
        actions={actions}
        customButton={{ buttonLabel: 'Add New', handleButton }}
      ></PaginatedTable>
    </div>
  );
}

export default AdditionalServicesLV;
