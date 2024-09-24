import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { filterNullValues } from '../../../common/filterNullVal';
import { useForm, FormProvider } from 'react-hook-form';
import { InputField } from '../../../common/InputField';
import {
  putApiCall,
  postApiCall,
  getApiCall,
} from '../../../services/api-service';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  ERROR_MESSAGE,
  RECORD_SAVED_SUCCESS,
  RECORD_UPDATED_SUCCESS,
} from '../../../common/constants';
import { useNavigate, useParams } from 'react-router-dom';

function AEDeposit() {
  const methods = useForm();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadData(id);
    }
  }, [id]);

  const loadData = async (id: string) => {
    await getApiCall(`/deposits/${id}`)
      .then((res) => {
        methods.reset(res.data);
      })
      .catch((err: any) => {
        console.error('Error loading data:', err);
      });
  };

  const onSubmit = (formData: any) => {
    console.log(typeof formData.users_limit);
    const data = filterNullValues(formData);
    console.log(data);

    if (isEditMode) {
      putApiCall(`/deposits/${id}`, data)
        .then((_res) => {
          toast.success(RECORD_SAVED_SUCCESS);
          navigate('/deposits');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    } else {
      postApiCall('/deposits', data)
        .then((_res) => {
          toast.success(RECORD_UPDATED_SUCCESS);
          navigate('/deposits');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    }
  };

  return (
    <>
      <Breadcrumb pageName={isEditMode? "Edit Deposit": "Add Deposit"} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Deposit Information
          </h3>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
              <div className="mb-4.5">
                <InputField
                  name="deposit_name"
                  label="Name"
                  type="text"
                  required={true}
                  errMsg="Name is required."
                  maxLength={100}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="deposit_description"
                  label="Description"
                  type="text"
                  required={false}
                  maxLength={500}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="deposit_price"
                  label="Price"
                  type="number"
                  required={true}
                  errMsg="Price is required"
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

export default AEDeposit;
