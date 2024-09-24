import { Column } from 'react-table';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';

const userColumns: Column<any>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Template Code',
    accessor: 'code',
  },
  {
    Header: 'Template Name',
    accessor: 'template',
  },
  {
    Header: 'Subject',
    accessor: 'subject',
  },
  {
    Header: 'Created At',
    accessor: 'created_at',
  }
];

const EmailTemplatesLV = () => {
  const navigate = useNavigate();
  const actions = {
    handleEdit: (row:any) => {
      navigate(`/edit-emailtemplate/${row.id}`);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Email Templates" />
      <PaginatedTable
        pagedApiUrl="/systememailtemplates/paged"
        columns={userColumns}
        actions={actions}
      />
    </>
  );
};

export default EmailTemplatesLV;
