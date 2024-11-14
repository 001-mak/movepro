import { useEffect, useRef, useState } from 'react';
import { useTable, useSortBy, usePagination, Column } from 'react-table';
import { getApiCall } from '../../services/api-service';
import { MdSearch } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { IoFilter, IoCloseCircle } from "react-icons/io5";

interface PaginatedTableProps<T extends object> {
  columns: Column<T>[];
  actions?: {
    handleView?: (row: any) => void;
    handleEdit?: (row: any) => void;
    handleDelete?: (row: any) => void;
  };
  customButton?: {
    buttonLabel: string;
    handleButton: () => void;
  };
  pagedApiUrl?: string;
  searchFormFields?: any;
  extraQueryParams?: any
  filterFields?: IFilterFields[]
}
export interface IFilterFields {
  id: string;
  label: string;
}

const PaginatedTable = <T extends object>({
  columns,
  actions,
  customButton,
  pagedApiUrl,
  filterFields,
  extraQueryParams,
}: PaginatedTableProps<T>) => {
  const [pageData, setPageData] = useState<T[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState([]);
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
    searchFilters?: any[],
    searchText?: string,
  ) => {
    try {
      console.log('Fetching data with:', {
        pageIndex,
        pageSize,
        sortBy,
        searchFilters,
        searchText,
      });
  
      const orderBy = sortBy.length ? sortBy[0].id : columns[0].accessor;
      const orderDirection = sortBy.length
        ? sortBy[0].desc
          ? 'desc'
          : 'asc'
        : 'desc';
  
      const params: Record<string, any> = {
        pageIndex: pageIndex + 1,
        pageSize,
        orderBy,
        orderDirection,
      };
  
      if (searchText) params.searchText = searchText;
      if (searchFilters && searchFilters.length > 0) {
        params.searchFilters = searchFilters.join(',');
      }
  
      const response = await getApiCall(`${pagedApiUrl}`, null, {
        params,
      });
      console.log('Fetched data:', response.data);
      setPageData(response.data.data);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const CustomCheckbox = ({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: () => void }) => {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();  // Prevent default behavior
      e.stopPropagation(); // Stop event propagation
      onChange();
    };

    return (
      <div onClick={handleClick} className="w-full">
        <label
          htmlFor={id}
          className="flex cursor-pointer select-none items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <input
              type="checkbox"
              id={id}
              className="sr-only"
              checked={checked}
              onChange={(e) => {
                e.stopPropagation();
                onChange();
              }}
            />
            <div
              className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${checked && 'border-primary bg-gray dark:bg-transparent'
                }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-sm ${checked && 'bg-primary'}`}
              ></span>
            </div>
          </div>
          {label}
        </label>
      </div>
    );
  };

  

  

  const resetFilters = () => {
    setSelectedFilters([]);
    fetchData(pageIndex, pageSize, sortBy, selectedFilters, searchText);
};

  const handleFilterChange = (fieldId: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(fieldId)) {
        // If ID exists, remove it
        return prev.filter(id => id !== fieldId);
      } else {
        // If ID doesn't exist, add it
        return [...prev, fieldId];
      }
    });
    setDropdownOpen(true);
  };

  // New function to handle apply filters
  const handleApplyFilters = () => {
    fetchData(pageIndex, pageSize, sortBy, selectedFilters , searchText);
    setDropdownOpen(false); // Only close dropdown when explicitly applying filters
    

  };
  useEffect(() => {
    fetchData(pageIndex, pageSize, sortBy, selectedFilters, searchText);
  }, [pageIndex, pageSize, sortBy, searchFilters]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);


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
            {filterFields && filterFields.length > 0 && (
              <>
                <button
                  className="text-primary hover:text-body"
                  ref={trigger}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <IoFilter className="text-2xl" />
                </button>

                <div
                  ref={dropdown}
                  className={`absolute right-0 top-10 z-40 w-70 space-y-1 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen ? 'block' : 'hidden'
                    }`}
                >
                  <div className="space-y-4">
                    {filterFields && filterFields.length > 0 && (
                      <>
                        {filterFields.map((field) => (
                          <CustomCheckbox
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            checked={selectedFilters.includes(field.id)}
                            onChange={() => handleFilterChange(field.id)}
                          />
                        ))}
                      </>
                    )}
                    <div className="flex gap-x-6 justify-end mt-5">
                      <button
                        className="flex items-center justify-center rounded bg-primary py-2 px-4 font-medium text-gray hover:bg-opacity-90"
                        onClick={resetFilters}
                      >
                        Reset
                      </button>
                      <button
                        disabled={!searchText}
                        className={`flex items-center justify-center rounded bg-primary py-2 px-4 font-medium text-gray hover:bg-opacity-90 ${searchText ? "cursor-pointer" : "cursor-not-allowed"
                          }`}
                        onClick={handleApplyFilters}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button className="inline justify-center rounded bg-primary px-2 py-2.5 ml-1 font-medium text-gray hover:bg-opacity-90"
            onClick={() => fetchData(pageIndex, pageSize, sortBy, selectedFilters, searchText)}>
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
                {actions && <th className="px-6 py-3">Action</th>}
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
                  <td className="border-b border-[#eee] py-4 dark:border-strokedark">
                    <div className="flex items-center justify-center ms-3 ">
                      {actions && actions?.handleView && (
                        <button
                          className="hover:text-primary px-1"
                          onClick={() => { }}
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
                          onClick={() => console.log("h")}
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
                          onClick={() => console.log("h")}
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
                  </td>
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
