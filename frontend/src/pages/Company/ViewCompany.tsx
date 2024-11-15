import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getApiCall } from '../../services/api-service';

function ViewCompany() {
  const [company, setCompany]: any = useState({});

  const { id } = useParams();
  async function fetchData() {
    if (id) {
      try {
        const { data }: any = await getApiCall(`/companies/${id}`);
        setCompany(data);
        console.log("Data" , data)
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  const renderValue = (value: any) => (value ? value : '-');

  return (
    <>
      <Breadcrumb pageName="View Company" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Company Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
          <div>
            <h3 className="font-medium dark:text-white">Company Name</h3>
            <p className="dark:text-white">
              {renderValue(company.company_name)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Company Email</h3>
            <p className="dark:text-white">
              {renderValue(company.company_email)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">First Name</h3>
            <p className="dark:text-white">{renderValue(company.first_name)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Last Name</h3>
            <p className="dark:text-white">{renderValue(company.last_name)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Email ID</h3>
            <p className="dark:text-white">{renderValue(company.email_id)}</p>
          </div>

          <div>
            <h3 className="font-medium dark:text-white">Street</h3>
            <p className="dark:text-white">{renderValue(company.street)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">City</h3>
            <p className="dark:text-white">{renderValue(company.city)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">State</h3>
            <p className="dark:text-white">{renderValue(company.state)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">ZIP</h3>
            <p className="dark:text-white">{renderValue(company.zip)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Country</h3>
            <p className="dark:text-white">{renderValue(company.country)}</p>
          </div>

          <div>
            <h3 className="font-medium dark:text-white">Slogan</h3>
            <p className="dark:text-white">{renderValue(company.slogan)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Tax ID</h3>
            <p className="dark:text-white">{renderValue(company.tax_id)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">US DOT</h3>
            <p className="dark:text-white">{renderValue(company.us_dot)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Company MC</h3>
            <p className="dark:text-white">{renderValue(company.company_mc)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Minimum Hour</h3>
            <p className="dark:text-white">
              {renderValue(company.minimum_hour)}
            </p>
          </div>

          <div>
            <h3 className="font-medium dark:text-white">Plan Purchased</h3>
            <p className="dark:text-white">
              {renderValue(company.plan_purchased)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              Plan Purchased Status
            </h3>
            <p className="dark:text-white">
              {company.plan_purchased_status == 0 ? 'Inactive' : 'Active'}
            </p>
          </div>

          <div>
            <h3 className="font-medium dark:text-white">Company Logo</h3>
            <p className="dark:text-white">
              {renderValue(company.company_logo)}
            </p>
          </div>

          <div className="col-span-3 pl-1 border-b bg-whiter dark:border-form-strokedark dark:bg-form-input">
            <h2 className="font-semibold text-lg dark:text-white">Links</h2>
          </div>

          <div>
            <h3 className="font-medium dark:text-white">Website</h3>
            <p className="dark:text-white">{renderValue(company.website)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Social Facebook</h3>
            <p className="dark:text-white">{renderValue(company.social_fb)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Social Twitter</h3>
            <p className="dark:text-white">{renderValue(company.social_tw)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Social LinkedIn</h3>
            <p className="dark:text-white">{renderValue(company.social_in)}</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Social Instagram</h3>
            <p className="dark:text-white">
              {renderValue(company.social_insta)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Social YouTube</h3>
            <p className="dark:text-white">
              {renderValue(company.social_tube)}
            </p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Social Pinterest</h3>
            <p className="dark:text-white">{renderValue(company.social_pin)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewCompany;
