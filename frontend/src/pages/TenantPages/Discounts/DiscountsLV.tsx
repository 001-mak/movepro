import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Column } from 'react-table';
import PaginatedTable from '../../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../../services/api-service';
import { toast } from 'react-toastify';
import { Discount } from '../../../interface/interfaces';


function DiscountsLV() {
  const navigate = useNavigate();
  const actions = {
    handleEdit: (row: any) => {
      navigate(`/edit-discount/${row.id}`);
    },
    handleDelete: async (row: any) => {
      try {
        await deleteApiCall(`/discounts/${row.id}`)
        toast.success("Record Deleted Successfully");
        navigate(0)
      } catch (error) {
        toast.error("Could not delete record");
      }
    },
  };

  const handleButton = () => {
    navigate('/add-discount');
  };

  const columns: Column<Discount>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'discount_name',
    },
    {
      Header: 'Description',
      accessor: 'discount_description',
    },
    {
      Header: 'Price',
      accessor: 'discount_price',
    }
  ];

  return (
    <div>
      <Breadcrumb pageName="Discount Management" />
      <PaginatedTable
        pagedApiUrl="/discounts/paged"
        columns={columns}
        actions={actions}
        customButton={{ buttonLabel: 'Add New', handleButton }}
      ></PaginatedTable>
    </div>
  );
}

export default DiscountsLV;
