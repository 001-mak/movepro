// import React, { Component } from 'react';
// import ModalOne from '../../common/Modals/ModalOne';
// import ModalThree from '../../common/Modals/ModalThree';
// import ModalTwo from '../../common/Modals/ModalTwo';
import { useModal } from '../../common/Modals/ModalContext';
import PaginatedTable from '../../components/Tables/PaginatedTable';
import { useNavigate } from 'react-router-dom';
import { SupportTicket } from '../../interface/interfaces';
import { Column } from 'react-table';


const columns: Column<SupportTicket>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Sender Name',
    accessor: (row:any) => {return `${row.tbl_user?.first_name} ${row.tbl_user?.last_name}`},
    id: 'sender_name',
  },
  {
    Header: 'Sender Email',
    accessor: (row:any) => row.tbl_user?.email_id,
    id: 'sender_email',
  },
  {
    Header: 'Subject',
    accessor: 'subject',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }:any) => value =='0'? 'Open':'Closed',
  },
  {
    Header: 'Time Created',
    accessor: 'time_created',
    Cell: ({ value }:any) => new Date(value).toLocaleString(),
  },
  
];

export default function SupportLV() {
  const navigate = useNavigate();
  const actions = {
    handleView: (row:any) => {
      navigate(`/view-support-ticket/${row.id}`);
    },
  };
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      title: 'Your Message Sent Successfully',
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      primaryButtonText: 'View Details',
      secondaryButtonText: 'Cancel',
      onClose: () => {
        console.log('Modal closed');
      }
    });
  };

  return (
    <div>
       <PaginatedTable
        pagedApiUrl="/supporttickets/paged"
        columns={columns}
        actions={actions}
      ></PaginatedTable>
{/* <button onClick={handleOpenModal} className="rounded-md bg-primary px-9 py-3 font-medium text-white">
      Open Modal
    </button>

      <ModalOne />
      <ModalTwo />
      <ModalThree /> */}
    </div>
  );
}
