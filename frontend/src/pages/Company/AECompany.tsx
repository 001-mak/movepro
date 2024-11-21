import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { InputField } from '../../common/InputField';
import { postApiCall } from '../../services/api-service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ERROR_MESSAGE,
  RECORD_SAVED_SUCCESS,
} from '../../common/constants';

const AECompany: React.FC = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log({ ...data, zip: String(data.zip), phone_no: String(data.phone_no), ssn: String(data.ssn)});
      await postApiCall('/auth/register', {...data, zip:String(data.zip)}).then(response=>{
        toast.success(RECORD_SAVED_SUCCESS);
        navigate('/companies');
      }
        
    ).catch((err) => {
              console.log(err);
              toast.error(ERROR_MESSAGE);
            });
  };

 

  return (
    <>
    <Breadcrumb pageName="Add Company" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap ">
            <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Company Information</h3>
              <div className='mt-4'>
                {/* REACT HOOK FORM FOR REGISTER */}
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
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
                    <div className="mb-5.5 flex items-end  col-12 ">
                      <input
                        value="Create Account"
                        type="submit"
                        className="flex w-full lg:w-1/5 items-end justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                      />
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AECompany;

