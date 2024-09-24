import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { filterNullValues } from '../../common/filterNullVal';
import { useForm, FormProvider } from 'react-hook-form';
import { InputField } from '../../common/InputField';
import {putApiCall, postApiCall, getApiCall} from '../../services/api-service'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  ERROR_MESSAGE,
  RECORD_SAVED_SUCCESS,
  RECORD_UPDATED_SUCCESS,
} from '../../common/constants';
import { useNavigate, useParams } from 'react-router-dom';

function AddPackage() {
  const methods = useForm();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadData(id);
    }
  }, [id]);

  const loadData = async (id: string) => {
    await getApiCall(`/packages/${id}`)
      .then((res) => {
        methods.reset(res.data);
      })
      .catch((err: any) => {
        console.error('Error loading data:', err);
      });
  };

  const onSubmit = (formData: any) => {
    console.log(typeof(formData.users_limit))
    const data = filterNullValues(formData)
    console.log(data)

    if (isEditMode) {
      putApiCall(`/packages/${id}`, data)
        .then((_res) => {
          toast.success(RECORD_SAVED_SUCCESS);
          navigate('/packages');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    } else {
      postApiCall('/packages', data)
        .then((_res) => {
          toast.success(RECORD_UPDATED_SUCCESS);
          navigate('/packages');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add Package" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Package Information
          </h3>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
              
            <div className="mb-4.5">
                <InputField
                  name="title"
                  label="Title"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="sub_title"
                  label="Sub Title"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="package"
                  label="Package"
                  type="text"
                  required={true}
                  errMsg="Package is required"
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="price"
                  label="Package Price"
                  type="text"
                  required={true}
                  errMsg="Price is required"
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="monthly"
                  label="Monthly"
                  type="text"
                  required={true}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="users_limit"
                  label="Users Limit"
                  type="number"
                  required={false}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="leads_limit"
                  label="Leads Limit"
                  type="number"
                  required={false}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="text4"
                  label="Description 1"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="text3"
                  label="Description 2"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="text6"
                  label="Description 3"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="sms_limit"
                  label="SMS Limit"
                  type="number"
                  required={false}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="email_limit"
                  label="Email Limit"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="link"
                  label="Link"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="type"
                  label="Package Type"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="button"
                  label="Button Name"
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="code"
                  label="Package No."
                  type="text"
                  required={false}
                />
              </div>

              <div className="mb-5.5 flex items-end justify-center">
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

export default AddPackage;
