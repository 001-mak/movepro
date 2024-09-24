import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ViewInformation from '../../common/ViewInformation';
import { getApiCall } from '../../services/api-service';

function ViewLead() {
  const [lead, setLead]: any = useState({});
  const renderValue = (value: any) => (value ? value : '-');
  const { id } = useParams();
  async function fetchData() {
    if (id) {
      try {
        const { data }: any = await getApiCall(`/leads/${id}`);
        const dataFormat = {};
        setLead(data);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      <Breadcrumb pageName="Lead Information" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Lead Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
          <div>
            <h3 className="font-medium dark:text-white">ID</h3>
            <p className="dark:text-white">{renderValue(lead.id)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">User ID</h3>
            <p className="dark:text-white">{renderValue(lead.user_id)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Provider ID</h3>
            <p className="dark:text-white">{renderValue(lead.provider_id)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Assigned To</h3>
            <p className="dark:text-white">{renderValue(lead.assigned_to)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Lead ID</h3>
            <p className="dark:text-white">{renderValue(lead.lead_id)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">First Name</h3>
            <p className="dark:text-white">{renderValue(lead.first_name)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Last Name</h3>
            <p className="dark:text-white">{renderValue(lead.last_name)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Phone</h3>
            <p className="dark:text-white">{renderValue(lead.phone)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Email</h3>
            <p className="dark:text-white">{renderValue(lead.email)}</p>
          </div>
          <div className="col-span-3">
            <h3 className="font-medium dark:text-white">Comments</h3>
            <p className="dark:text-white">{renderValue(lead.comments)}</p>
          </div>

          {/* View Mode Section Heading */}
          <div className="col-span-3 pl-1 border-b bg-whiter dark:border-form-strokedark dark:bg-form-input">
            <h2 className="font-semibold text-lg dark:text-white">Job Details</h2>
          </div>
          
          <div>
            <h3 className="font-medium dark:text-white">Job Detail</h3>
            <p className="dark:text-white">{renderValue(lead.JobDetail)}</p>
          </div>

          <div>
            <h3 className="font-medium dark:text-white">Job Type</h3>
            <p className="dark:text-white">{renderValue(lead.JobType)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Service Type</h3>
            <p className="dark:text-white">{renderValue(lead.ServiceType)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Desired Date</h3>
            <p className="dark:text-white">{renderValue(lead.DesiredDate)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Desired Time</h3>
            <p className="dark:text-white">{renderValue(lead.DesiredTime)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Move Date</h3>
            <p className="dark:text-white">{renderValue(lead.MoveDate)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Move Time</h3>
            <p className="dark:text-white">{renderValue(lead.MoveTime)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Estimated Date</h3>
            <p className="dark:text-white">{renderValue(lead.EstimatedDate)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Estimated Time</h3>
            <p className="dark:text-white">{renderValue(lead.EstimatedTime)}</p>
          </div>

          <div>
            <h3 className="font-medium dark:text-white">Unique ID</h3>
            <p className="dark:text-white">{renderValue(lead.unique_id)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Insert Time</h3>
            <p className="dark:text-white">{renderValue(lead.insert_time)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Distance</h3>
            <p className="dark:text-white">{renderValue(lead.distance)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Lead Status</h3>
            <p className="dark:text-white">{renderValue(lead.lead_status)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Book Date</h3>
            <p className="dark:text-white">{renderValue(lead.book_date)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Complete Date</h3>
            <p className="dark:text-white">{renderValue(lead.complete_date)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Accept Status</h3>
            <p className="dark:text-white">{renderValue(lead.accept_status)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Reject Reason</h3>
            <p className="dark:text-white">{renderValue(lead.reject_reason)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Assigned Date</h3>
            <p className="dark:text-white">{renderValue(lead.assigned_date)}</p>
          </div>
          <div className="col-span-3 pl-1 border-b bg-whiter dark:border-form-strokedark dark:bg-form-input">
            <h2 className="font-semibold text-lg dark:text-white">Loading</h2>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Loading Dwelling Size
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.LoadingDwellingSize)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Place Name</h3>
            <p className="dark:text-white">
              {renderValue(lead.LoadingPlaceName)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Apartment</h3>
            <p className="dark:text-white">
              {renderValue(lead.LeadLoadingApartment)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Notes</h3>
            <p className="dark:text-white">
              {renderValue(lead.LeadLoadingNotes)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Address</h3>
            <p className="dark:text-white">
              {renderValue(lead.LoadingAddress)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Zip</h3>
            <p className="dark:text-white">{renderValue(lead.LoadingZip)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Latitude</h3>
            <p className="dark:text-white">{renderValue(lead.LoadingLat)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Longitude</h3>
            <p className="dark:text-white">{renderValue(lead.LoadingLong)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading City</h3>
            <p className="dark:text-white">{renderValue(lead.LoadingCity)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading State</h3>
            <p className="dark:text-white">{renderValue(lead.LoadingState)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Stairs</h3>
            <p className="dark:text-white">{renderValue(lead.LoadingStairs)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Loading Need Help Packing
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.LoadingNeedHelpPacking)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Loading Packing Date
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.LoadingPackingDate)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Loading Packing Time
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.LoadingPackingTime)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Elevator</h3>
            <p className="dark:text-white">
              {renderValue(lead.LoadingElevator)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Loading Garage</h3>
            <p className="dark:text-white">{renderValue(lead.LoadingGarage)}</p>
          </div>

          <div className="col-span-3 pl-1 border-b bg-whiter dark:border-form-strokedark dark:bg-form-input">
            <h2 className="font-semibold text-lg dark:text-white">Unloading</h2>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Unloading Dwelling Size
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.UnloadingDwellingSize)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Unloading Place Name
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.UnloadingPlaceName)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading Apartment</h3>
            <p className="dark:text-white">
              {renderValue(lead.LeadUnloadingApartment)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading Notes</h3>
            <p className="dark:text-white">
              {renderValue(lead.LeadUnloadingNotes)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading Address</h3>
            <p className="dark:text-white">
              {renderValue(lead.UnloadingAddress)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading Zip</h3>
            <p className="dark:text-white">{renderValue(lead.UnloadingZip)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading Latitude</h3>
            <p className="dark:text-white">{renderValue(lead.UnloadingLat)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading Longitude</h3>
            <p className="dark:text-white">{renderValue(lead.UnloadingLong)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading City</h3>
            <p className="dark:text-white">{renderValue(lead.UnloadingCity)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading State</h3>
            <p className="dark:text-white">
              {renderValue(lead.UnloadingState)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading Stairs</h3>
            <p className="dark:text-white">
              {renderValue(lead.UnloadingStairs)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Unloading Need Help Packing
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.UnloadingNeedHelpPacking)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Unloading Elevator</h3>
            <p className="dark:text-white">
              {renderValue(lead.UnloadingElevator)}
            </p>
          </div>

          <div className="col-span-3 pl-1 border-b bg-whiter dark:border-form-strokedark dark:bg-form-input">
            <h2 className="font-semibold text-lg dark:text-white">
              Second Loading
            </h2>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Dwelling Size
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingDwellingSize)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Place Name
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingPlaceName)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Apartment
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingApartment)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Address
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingAddress)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Second Loading Zip</h3>
            <p className="dark:text-white">{renderValue(lead.secLoadingZip)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Latitude
            </h3>
            <p className="dark:text-white">{renderValue(lead.secLoadingLat)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Longitude
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingLong)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Second Loading City</h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingCity)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading State
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingState)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Stairs
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingStairs)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Need Help Packing
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingNeedHelpPacking)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Packing Date
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingPackingDate)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Packing Time
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingPackingTime)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Elevator
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingElevator)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Garage
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingGarage)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Loading Notes
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLoadingNotes)}
            </p>
          </div>

          <div className="col-span-3 pl-1 border-b bg-whiter dark:border-form-strokedark dark:bg-form-input">
            <h2 className="font-semibold text-lg dark:text-white">
              Second Unloading
            </h2>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Dwelling Size
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingDwellingSize)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Place Name
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingPlaceName)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Apartment
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingApartment)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Address
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingAddress)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Zip
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingZip)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Latitude
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnoadingLat)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Longitude
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnoadingLong)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading City
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingCity)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading State
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingState)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Stairs
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingStairs)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Need Help Packing
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingNeedHelpPacking)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Elevator
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secUnloadingElevator)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Second Unloading Notes
            </h3>
            <p className="dark:text-white">
              {renderValue(lead.secLeadUnloadingNotes)}
            </p>
          </div>

          <div>
            <h3 className="font-medium dark:text-white">Lead Stop 1</h3>
            <p className="dark:text-white">{renderValue(lead.LeadStop1)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Lead Stop 2</h3>
            <p className="dark:text-white">{renderValue(lead.LeadStop2)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Lead Stop 3</h3>
            <p className="dark:text-white">{renderValue(lead.LeadStop3)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewLead;
