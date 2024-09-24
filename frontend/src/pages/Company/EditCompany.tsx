import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import { useForm, FormProvider } from 'react-hook-form';
import { InputField } from '../../common/InputField';
import { SelectOption } from '../../common/SelectOption';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getApiCall, putApiCall } from '../../services/api-service';
import { toast } from 'react-toastify';
import { ERROR_MESSAGE, RECORD_UPDATED_SUCCESS } from '../../common/constants';

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const methods = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadData(id);
    }
  }, [id]);

  const loadData = async (id: string) => {
    await getApiCall(`/companies/${id}`)
      .then((res) => {
        methods.reset(res.data);
      })
      .catch((err: any) => {
        console.error('Error loading data:', err);
      });
  };

  const onSubmit = (data: any) => {
    let {
      confirmpassword,
      username,
      first_name,
      last_name,
      status,
      email_id,
      user_id,
      ...body
    } = data;
    body.plan_purchased = parseInt(body.plan_purchased);

    if (isEditMode) {
      putApiCall(`/companies/${id}`, body)
        .then((_res) => {
          toast.success(RECORD_UPDATED_SUCCESS);
          navigate('/companies');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    }
  };

  useEffect(() => {
    getApiCall('/packages/').then((res) => {
      let p: any = [];
      res.data?.forEach((e: any) => {
        p.push({ Label: e.package, Value: e.id });
      });
      setPackages(p);
    });
  }, []);

  return (
    <>
      <Breadcrumb pageName={isEditMode ? 'Edit Company' : 'Add Company'} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Company Information
          </h3>
        </div>
        {packages && (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
                <div className="mb-5.5">
                  <InputField
                    name="email_id"
                    label="Email"
                    type="email"
                    required={true}
                    errMsg="Email is required"
                    disabled={isEditMode}
                    maxLength={250}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="company_name"
                    label="Company Name"
                    type="text"
                    required={true}
                    errMsg="Company Name is required"
                    maxLength={250}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="slogan"
                    label="Company Slogan"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={100}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="street"
                    label="Street Address"
                    type="text"
                    required={true}
                    errMsg="Street Address is required"
                    maxLength={255}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="city"
                    label="City"
                    type="text"
                    required={true}
                    errMsg="City is required"
                    maxLength={50}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="state"
                    label="State"
                    type="text"
                    required={true}
                    errMsg="State is required"
                    maxLength={50}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="zip"
                    label="Zipcode"
                    type="text"
                    required={true}
                    errMsg="Zipcode is required"
                    maxLength={10}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="country"
                    label="Country"
                    type="text"
                    required={true}
                    errMsg="Country is required"
                    maxLength={50}
                  />
                </div>

                <div className="mb-5.5">
                  <SelectOption
                    name="plan_purchased"
                    label="Package Plan"
                    required={true}
                    value={packages ?? []}
                    errMsg="Package plan is required"
                  />
                </div>

                <div className="mb-5.5">
                  <SelectOption
                    name="plan_purchased_status"
                    label="Company Status"
                    required={true}
                    value={[
                      { Label: 'InActive', Value: 0 },
                      { Label: 'Active', Value: 1 },
                    ]}
                    errMsg="Company Status is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="website"
                    label="Website"
                    type="text"
                    required={false}
                    errMsg="Website is required"
                    maxLength={255}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="social_fb"
                    label="Facebook Link"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={255}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="social_tw"
                    label="Twitter Link"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={255}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="social_in"
                    label="Linkedin Link"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={255}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="social_insta"
                    label="Instagram Link"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={255}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="social_tube"
                    label="Youtube Link"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={255}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="tax_id"
                    label="Tax ID"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={100}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="us_dot"
                    label="US Dot"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={100}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="company_mc"
                    label="Company MC"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={100}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="minimum_hour"
                    label="Minimum Hour"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={100}
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="social_pin"
                    label="Social Pin"
                    type="text"
                    required={false}
                    errMsg=""
                    maxLength={255}
                  />
                </div>

                <div className="mb-5.5 lg:px-10 flex items-end justify-center">
                  <input
                    type="submit"
                    className="flex w-full items-end justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
}

export default EditCompany;
