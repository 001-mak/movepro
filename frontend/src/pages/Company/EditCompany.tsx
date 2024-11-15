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
              <div className="mb-4.5">
                <InputField
                  name="first_name"
                  label="First Name"
                  type="text"
                  required={true}
                  minLength={2}
                  maxLength={50}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="last_name"
                  label="Last Name"
                  type="text"
                  required={true}
                  minLength={2}
                  maxLength={50}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="email_id"
                  label="Email"
                  type="email"
                  required={true}
                  minLength={2}
                  disabled={isEditMode}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="ssn"
                  label="SSN"
                  type="number"
                  required={true}
                  minLength={9}
                  maxLength={9}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="phone_no"
                  label="Phone Number"
                  type="number"
                  required={true}
                  minLength={10}
                  maxLength={15}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="company_name"
                  label="Company Name"
                  type="text"
                  required={true}
                  minLength={3}
                  maxLength={150}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="street"
                  label="Street Address"
                  type="text"
                  required={true}
                  minLength={2}
                  maxLength={250}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="city"
                  label="City"
                  type="text"
                  required={true}
                  minLength={2}
                  maxLength={250}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="state"
                  label="State"
                  type="text"
                  required={true}
                  minLength={2}
                  maxLength={250}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="country"
                  label="Country"
                  type="text"
                  required={true}
                  minLength={2}
                  maxLength={250}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="zip"
                  label="Zipcode"
                  type="number"
                  required={true}
                  minLength={5}
                  maxLength={5}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  required={true}
                  minLength={8}
                  maxLength={250}
                />
              </div>

            </div>
            <div className="mb-5.5 flex items-end px-6.5 col-12">
              <input
                value={` ${isEditMode ? "Edit Account" : "Create Account"}`}
                type="submit"
                className="flex w-full lg:w-1/5 items-end justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              />
            </div>
            
          </form>
        </FormProvider>

                
        )}
      </div>
    </>
  );
}

export default EditCompany;
