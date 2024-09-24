import { Column } from 'react-table';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { SquareTransaction } from '../../interface/interfaces';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { deleteApiCall } from '../../services/api-service';
import { toast } from 'react-toastify';

// table header
// const columns: Column<Paymenthistory>[] = [
//   {
//     Header: 'Order Id',
//     accessor: 'orderId',
//   },
//   {
//     Header: 'User Id',
//     accessor: 'user',
//   },
//   {
//     Header: 'Email',
//     accessor: 'email',
//   },
//   {
//     Header: 'Package Price',
//     accessor: 'packagePrice',
//   },
//   {
//     Header: 'Payment Status',
//     accessor: 'paymentStatus',
//   },
// ];


const columns: Column<SquareTransaction>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Company ID',
    accessor: 'company_id',
  },
  {
    Header: 'Order ID',
    accessor: 'order_id',
  },
  {
    Header: 'Package Price',
    accessor: 'package_price',
  },
  {
    Header: 'Package',
    accessor: 'package',
  },
  {
    Header: 'Payment Status',
    accessor: 'payment_status',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Currency',
    accessor: 'currency',
  },
  {
    Header: 'Card Status',
    accessor: 'card_status',
  },
  {
    Header: 'Card Brand',
    accessor: 'card_brand',
  },
  {
    Header: 'Created At',
    accessor: 'created_at',
  },
  {
    Header: 'Updated At',
    accessor: 'updated_at',
  },
  
];

const PaymentHistory = () => {
  const navigate = useNavigate();
  const actions = {
    handleView: (row:any) => {
      navigate(`/view-transaction/${row.id}`);
    },
  };

  return <>
      <Breadcrumb pageName="Payment History"/>
      <PaginatedTable
        pagedApiUrl="/payments/squaretransactions/paged"
        columns={columns}
        actions={actions}
      ></PaginatedTable>
  </>;
};

export default PaymentHistory;
