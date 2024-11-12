import { useEffect, useRef, useState } from 'react';
import { useTable, useSortBy, usePagination, Column } from 'react-table';
import { getApiCall } from '../../services/api-service';
import { MdSearch } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';

interface PaginatedTableProps<T extends object> {
  columns: Column<T>[];
  // actions?: {
  //   handleView?: (row: any) => void;
  //   handleEdit?: (row: any) => void;
  //   handleDelete?: (row: any) => void;
  // };
  customButton?: {
    buttonLabel: string;
    handleButton: () => void;
  };
  pagedApiUrl?: string;
  searchFormFields?: any;
  extraQueryParams?: any
}

const PaginatedTable = <T extends object>({
  columns,
  // actions,
  customButton,
  pagedApiUrl,
  searchFormFields,
  extraQueryParams
}: PaginatedTableProps<T>) => {
  const [pageData, setPageData] = useState<T[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const [searchFilters, setSearchFilters] = useState({});
  const [searchText, setSearchText] = useState('');
  const methods = useForm();
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount: tablePageCount,
    nextPage,
    previousPage,
    setPageSize,
    globalFilter,
    setGlobalFilter,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: pageData,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount,
      manualSortBy: true,
    },
    useSortBy,
    usePagination,
  );

  const fetchData = async (
    pageIndex: number,
    pageSize: number,
    sortBy: any[],
    searchFilters: any,
  ) => {
    try {
      const orderBy = sortBy.length ? sortBy[0].id : columns[0].accessor;
      const orderDirection = sortBy.length
        ? sortBy[0].desc
          ? 'desc'
          : 'asc'
        : 'desc';

      getApiCall(`${pagedApiUrl}`,null,{
        params: {
          pageIndex: pageIndex + 1,
          pageSize,
          orderBy,
          orderDirection,
          // searchText,
          // ...searchFilters,
          // ...extraQueryParams
        },
      }).then((res) => {
        setDropdownOpen(false);
        console.log(res.data);
        setPageData(res.data.data);
        setPageCount(res.data.totalPages);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(pageIndex, pageSize, sortBy, searchFilters);
  }, [pageIndex, pageSize, sortBy, searchFilters]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const onSubmit = (formData: any) => {
    setSearchFilters(formData);
    let aa = methods.watch();

    setSearchFilters({...aa});
  };

  return (
    <section className="data-table-common data-table-two rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between border-b border-stroke px-4 pb-4 dark:border-strokedark">
        {customButton ? (
          <button
            className="flex justify-center rounded bg-primary pt-2.5 px-5 font-medium text-gray hover:bg-opacity-90"
            onClick={customButton.handleButton}
          >
            {customButton.buttonLabel}
          </button>
        ) : (
          <div></div>
        )}
        <div className="w-80 flex items-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="inline w-80 rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary dark:text-white"
            placeholder="Search..."
          />
          <div className="relative flex ml-1">
            {searchFormFields && (
              <>
                <button
                  className="text-primary hover:text-body"
                  ref={trigger}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 11.25C3.49264 11.25 4.5 10.2426 4.5 9C4.5 7.75736 3.49264 6.75 2.25 6.75C1.00736 6.75 0 7.75736 0 9C0 10.2426 1.00736 11.25 2.25 11.25Z"
                      fill=""
                    />
                    <path
                      d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                      fill=""
                    />
                    <path
                      d="M15.75 11.25C16.9926 11.25 18 10.2426 18 9C18 7.75736 16.9926 6.75 15.75 6.75C14.5074 6.75 13.5 7.75736 13.5 9C13.5 10.2426 14.5074 11.25 15.75 11.25Z"
                      fill=""
                    />
                  </svg>
                </button>

                <div
                  ref={dropdown}
                  onFocus={() => setDropdownOpen(true)}
                  className={`absolute right-0 top-full z-40 w-150 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                    dropdownOpen === true ? 'block' : 'hidden'
                  }`}
                >
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
                        {searchFormFields}
                        <div className="mb-5.5 flex items-end justify-center">
                          <input
                            type="submit"
                            className="flex w-full items-end justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                          />
                        </div>
                        <div className="mb-5.5 flex items-end justify-center">

                        <button className="flex w-full items-end justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                          onClick={()=>{
                            setSearchFilters({});
                            let currentValues = methods.watch();
                            const updatedValues = Object.keys(currentValues).reduce((acc:any, key) => {
                              acc[key] = '';
                              return acc;
                            }, {});
                            
                            methods.reset(updatedValues);
                            setSearchText('');
                          }}>
                            Reset
                          </button>
                        </div>

                      </div>
                    </form>
                  </FormProvider>
                </div>
              </>
            )}
          </div>
          <button className="inline justify-center rounded bg-primary px-2 py-2.5 ml-1 font-medium text-gray hover:bg-opacity-90"
            onClick={()=>fetchData(pageIndex, pageSize, sortBy, searchFilters)}>
            <MdSearch className="fill-current text-xl" />
          </button>
        </div>
      </div>
      <div className="w-full min-w-full overflow-x-auto">
        <table
          {...getTableProps()}
          className="datatable-table w-max min-w-full table-auto border-collapse break-words px-4 md:table-fixed md:px-8"
        >
          <thead>
            {headerGroups.map((headerGroup, key) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                {headerGroup.headers.map((column, key) => (
                  <th
                    className="px-3 py-1 text-sm"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={key}
                  >
                    <div className="flex items-center me-8">
                      <span className="text-left">
                        {' '}
                        {column.render('Header')}
                      </span>

                      <div className="ml-2 inline-flex flex-col space-y-[2px]">
                        <span className="inline-block">
                          <svg
                            className="fill-current"
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 0L0 5H10L5 0Z" fill="" />
                          </svg>
                        </span>
                        <span className="inline-block">
                          <svg
                            className="fill-current"
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </th>
                ))}
                {/* {actions && <th className="px-6 py-3">Action</th>} */}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, key: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={key}>
                  {row.cells.map((cell: any, key: any) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={key}
                        className="px-4 py-1 text-sm"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                  {/* <td className="border-b border-[#eee] py-4 dark:border-strokedark">
                    <div className="flex items-center justify-center ms-3 ">
                      {actions && actions?.handleView && (
                        <button
                          className="hover:text-primary px-1"
                          onClick={() => actions?.handleView(row.original)}
                        >
                          <svg
                            className="fill-current"
                            width="17"
                            height="17"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                              fill=""
                            />
                            <path
                              d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      )}
                      {actions && actions?.handleEdit && (
                        <button
                          className="hover:text-primary px-1"
                          onClick={() => actions.handleEdit(row.original)}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6 20.71 5.62L18.37 3.28C17.98 2.89 17.34 2.89 16.95 3.28L15.13 5.1L18.88 8.85L20.71 7.04Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      )}
                      {actions && actions?.handleDelete && (
                        <button
                          className="hover:text-primary px-1"
                          onClick={() => actions.handleDelete(row.original)}
                        >
                          <svg
                            className="fill-current"
                            width="17"
                            height="17"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark dark:text-white">
        <p className="font-medium">
          {pageIndex + 1} 0f {pageOptions.length} pages
        </p>
        <div className="flex items-center font-medium">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-transparent pl-2"
          >
            {[5, 10, 20, 50].map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          <p className="pl-2 font-medium">Entries Per Page</p>
        </div>
        <div className="flex">
          <button
            className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-whiter"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
                fill=""
              />
            </svg>
          </button>

          <button
            className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaginatedTable;
