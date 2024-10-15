import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, FormProvider } from 'react-hook-form';
import { InputField } from '../../common/InputField';
import { SelectOption } from '../../common/SelectOption';
import { useNavigate } from 'react-router-dom';
import { getApiCall, postApiCall } from '../../services/api-service';
import { toast } from 'react-toastify';
import {
  ERROR_MESSAGE,
  PASSWORD_MISMATCH_ERROR_MESSAGE,
  RECORD_SAVED_SUCCESS,
} from '../../common/constants';
import { useEffect, useState } from 'react';

function AECompany() {
  const navigate = useNavigate();
  const methods = useForm();
  const [packages, setPackages] = useState(null);

  const onSubmit = (data: any) => {
    if (data.password != data.confirmpassword) {
      toast.error(PASSWORD_MISMATCH_ERROR_MESSAGE);
      return;
    }
    let { confirmpassword, ...body } = data;
    body.packageplan = parseInt(body.packageplan);

    postApiCall('/auth/register', body)
      .then((_res) => {
        toast.success(RECORD_SAVED_SUCCESS);
        navigate('/companies');
      })
      .catch((err) => {
        console.log(err);
        toast.error(ERROR_MESSAGE);
      });
  };

  // useEffect(() => {
  //   getApiCall('/packages/').then((res) => {
  //     let p: any = [];
  //     res.data?.forEach((e: any) => {
  //       p.push({ Label: e.package, Value: e.id });
  //     });
  //     setPackages(p);
  //   });
  // }, []);

  return (
    <>
      <Breadcrumb pageName="Add Company" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Company Information
          </h3>
        </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
                <div className="mb-4.5">
                  <InputField
                    name="username"
                    label="Username"
                    type="text"
                    required={true}
                    errMsg="Username is required"
                  />
                </div>

                <div className="mb-4.5">
                  <InputField
                    name="first_name"
                    label="First Name"
                    type="text"
                    required={true}
                    errMsg="First Name is required"
                  />
                </div>

                <div className="mb-4.5">
                  <InputField
                    name="last_name"
                    label="Last Name"
                    type="text"
                    required={true}
                    errMsg="Last Name is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    required={true}
                    errMsg="Email is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="phone"
                    label="Phone Number"
                    type="text"
                    required={true}
                    errMsg="Phone Number is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="company"
                    label="Company Name"
                    type="text"
                    required={true}
                    errMsg="Company Name is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="street"
                    label="Street Address"
                    type="text"
                    required={true}
                    errMsg="Street Address is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="city"
                    label="City"
                    type="text"
                    required={true}
                    errMsg="City is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="state"
                    label="State"
                    type="text"
                    required={true}
                    errMsg="State is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="country"
                    label="Country"
                    type="text"
                    required={true}
                    errMsg="Country is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="zip"
                    label="Zipcode"
                    type="text"
                    required={true}
                    errMsg="Zipcode is required"
                  />
                </div>

                <div className="mb-5.5">
                  <SelectOption
                    name="packageplan"
                    label="Package Plan"
                    required={true}
                    value={packages ?? []}
                    errMsg="Package plan is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    required={true}
                    errMsg="Password is required"
                  />
                </div>

                <div className="mb-5.5">
                  <InputField
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    required={true}
                    errMsg="Confirm Password is required"
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
      </div>
    </>
  );
}

export default AECompany;
