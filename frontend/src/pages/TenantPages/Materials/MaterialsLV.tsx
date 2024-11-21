import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Column } from 'react-table';
import PaginatedTable from '../../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../../services/api-service';
import { toast } from 'react-toastify';
import { Material } from '../../../interface/interfaces';


function MaterialsLV() {
  const navigate = useNavigate();
  const actions = {
    handleEdit: (row: any) => {
      navigate(`/edit-material/${row.id}`);
    },
    handleDelete: async (id: any) => {
      try {
        await deleteApiCall(`/materials/${id}`)
        toast.success("Record Deleted Successfully");
        navigate(0)
      } catch (error) {
        toast.error("Could not delete record");
      }
    },
  };

  const handleButton = () => {
    navigate('/add-material');
  };

  const columns: Column<Material>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'material_name',
    },
    {
      Header: 'Description',
      accessor: 'material_description',
    },
    {
      Header: 'Price',
      accessor: 'material_price',
    }
  ];

  return (
    <div>
      <Breadcrumb pageName="Material Management" />
      <PaginatedTable
        pagedApiUrl="/materials"
        columns={columns}
        actions={actions}
        customButton={{ buttonLabel: 'Add New', handleButton }}
      ></PaginatedTable>
    </div>
  );
}

export default MaterialsLV;
