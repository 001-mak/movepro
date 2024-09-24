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

function AEValuation() {
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
    await getApiCall(`/valuations/${id}`)
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
      putApiCall(`/valuations/${id}`, data)
        .then((_res) => {
          toast.success(RECORD_SAVED_SUCCESS);
          navigate('/valuations');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    } else {
      postApiCall('/valuations', data)
        .then((_res) => {
          toast.success(RECORD_UPDATED_SUCCESS);
          navigate('/valuations');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    }
  };

  return (
    <>
      <Breadcrumb
        pageName={
          isEditMode
            ? 'Edit Full Value Protection'
            : 'Add Full Value Protection'
        }
      />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Full Value Protection Information
          </h3>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
              <div className="mb-4.5">
                <InputField
                  name="valuation_name"
                  label="Name"
                  type="text"
                  required={true}
                  errMsg="Name is required."
                  maxLength={100}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="description"
                  label="Description"
                  type="text"
                  required={false}
                  maxLength={500}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="item_lb_kg"
                  label="Coverage Per item lb/kg"
                  type="text"
                  required={true}
                  maxLength={100}
                  errMsg="Coverage Per item lb/kg is required."
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="storage"
                  label="Storage"
                  type="text"
                  required={false}
                  maxLength={250}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="maximum_rate"
                  label="Maximum Rate (Limit)"
                  type="number"
                  required={true}
                  errMsg="Maximum Rate (Limit) is required"
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="deductable"
                  label="Deductable Amount"
                  type="number"
                  required={true}
                  errMsg="Deductable amount is required"
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="cost"
                  label="Cost"
                  type="number"
                  required={true}
                  errMsg="Cost is required"
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

export default AEValuation;
