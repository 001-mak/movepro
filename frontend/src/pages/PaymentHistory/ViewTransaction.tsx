import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getApiCall } from '../../services/api-service';

function ViewTransaction() {
  const [transaction, setTransaction]: any = useState({});

  const { id } = useParams();
  
  async function fetchData() {
    if (id) {
      try {
        const { data }: any = await getApiCall(
          `/payments/squaretransactions/${id}`,
        );

        setTransaction(data);
      } catch (error) {
        console.error('Error fetching transation data:', error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      <Breadcrumb pageName="Transaction Details" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Transaction Details
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
          <div>
            <h3 className="font-medium dark:text-white">ID</h3>
            <p className="dark:text-white">{transaction.id}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Package Price</h3>
            <p className="dark:text-white">{transaction.package_price}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Package</h3>
            <p className="dark:text-white">{transaction.package}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Payment Status</h3>
            <p className="dark:text-white">{transaction.payment_status}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Amount</h3>
            <p className="dark:text-white">{transaction.amount}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Currency</h3>
            <p className="dark:text-white">{transaction.currency}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Card Status</h3>
            <p className="dark:text-white">{transaction.card_status}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Card Brand</h3>
            <p className="dark:text-white">{transaction.card_brand}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Created At</h3>
            <p className="dark:text-white">{transaction.created_at}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Updated At</h3>
            <p className="dark:text-white">{transaction.updated_at}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Company ID</h3>
            <p className="dark:text-white">{transaction.company_id}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Package ID</h3>
            <p className="dark:text-white">{transaction.package_id}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Payment ID</h3>
            <p className="dark:text-white">{transaction.payment_id}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Delay Duration</h3>
            <p className="dark:text-white">{transaction.delay_duration}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Source Type</h3>
            <p className="dark:text-white">{transaction.source_type}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Last 4 Digits</h3>
            <p className="dark:text-white">{transaction.last_4}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Expiration Month</h3>
            <p className="dark:text-white">{transaction.exp_month}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Expiration Year</h3>
            <p className="dark:text-white">{transaction.exp_year}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Fingerprint</h3>
            <p className="dark:text-white">{transaction.fingerprint}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Card Type</h3>
            <p className="dark:text-white">{transaction.card_type}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">BIN</h3>
            <p className="dark:text-white">{transaction.bin}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Entry Method</h3>
            <p className="dark:text-white">{transaction.entry_method}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">CVV Status</h3>
            <p className="dark:text-white">{transaction.cvv_status}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">AVS Status</h3>
            <p className="dark:text-white">{transaction.avs_status}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Statement Description</h3>
            <p className="dark:text-white">{transaction.statement_description}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Location ID</h3>
            <p className="dark:text-white">{transaction.location_id}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Order ID</h3>
            <p className="dark:text-white">{transaction.order_id}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Total Amount</h3>
            <p className="dark:text-white">{transaction.total_amount}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Receipt Number</h3>
            <p className="dark:text-white">{transaction.receipt_number}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Receipt URL</h3>
            <p className="dark:text-white">{transaction.receipt_url}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Delay Action</h3>
            <p className="dark:text-white">{transaction.delay_action}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Delayed Until</h3>
            <p className="dark:text-white">{transaction.delayed_until}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewTransaction;
