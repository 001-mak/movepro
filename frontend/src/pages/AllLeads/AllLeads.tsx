import { Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Lead } from '../../interface/interfaces';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { InputField } from '../../common/InputField';
import { SelectOption } from '../../common/SelectOption';

// table header
const columns: Column<Lead>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  // {
  //   Header: 'User ID',
  //   accessor: 'user_id',
  // },
  // {
  //   Header: 'Provider ID',
  //   accessor: 'provider_id',
  // },
  {
    Header: 'Assigned To',
    accessor: 'assigned_to',
  },
  {
    Header: 'Lead ID',
    accessor: 'lead_id',
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Job Detail',
    accessor: 'JobDetail',
  },
  {
    Header: 'Job Type',
    accessor: 'JobType',
  },
  {
    Header: 'Service Type',
    accessor: 'ServiceType',
  },
  {
    Header: 'Desired Date',
    accessor: 'DesiredDate',
  },
  {
    Header: 'Desired Time',
    accessor: 'DesiredTime',
  },
  {
    Header: 'Move Date',
    accessor: 'MoveDate',
  },
  {
    Header: 'Move Time',
    accessor: 'MoveTime',
  },
  {
    Header: 'Estimated Date',
    accessor: 'EstimatedDate',
  },
  {
    Header: 'Estimated Time',
    accessor: 'EstimatedTime',
  },
  {
    Header: 'Insert Time',
    accessor: 'insert_time',
  },
  {
    Header: 'Distance',
    accessor: 'distance',
  },
  {
    Header: 'Lead Status',
    accessor: 'lead_status',
  },
  {
    Header: 'Book Date',
    accessor: 'book_date',
  },
  {
    Header: 'Complete Date',
    accessor: 'complete_date',
  },
  {
    Header: 'Accept Status',
    accessor: 'accept_status',
  },
  {
    Header: 'Reject Reason',
    accessor: 'reject_reason',
  },
  {
    Header: 'Assigned Date',
    accessor: 'assigned_date',
  },
];

const countries = [
  { Label: 'United States', Value: 'US' },
  { Label: 'Canada', Value: 'CA' },
  { Label: 'Australia', Value: 'AU' },
  { Label: 'United Kingdom', Value: 'UK' },
];


const AllLeads = () => {
  const navigate = useNavigate();
  const actions = {
    handleView: (row: any) => {
      navigate(`/view-lead/${row.id}`);
    },
  };
  return (
    <>
      <Breadcrumb pageName="All Leads" />
      <PaginatedTable
        pagedApiUrl="/leads"
        columns={columns}
        // actions={actions}
        searchFormFields={
          <>
            <div className="mb-5.5">
              {/* <InputField
                name="searchText"
                label="Search"
                type="text"
                required={false}
              /> */}
            </div>

            <div className="mb-5.5">
              <SelectOption
                name="country"
                label="Select Country"
                value={countries}
                required={true}
                errMsg="Please select a country."
              />
            </div>
          </>
        }
      />
    </>
  );
};

export default AllLeads;
