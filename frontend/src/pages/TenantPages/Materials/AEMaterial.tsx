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

function AEMaterial() {
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
    try {
      const res = await getApiCall(`/materials/${id}`);
      console.log("Materials" , res.data);
      
      // Use reset instead of setValue for comprehensive form population
      methods.reset({
        material_name: res.data.material.material_name,
        material_description: res.data.material.material_description,
        material_price: res.data.material.material_price
      });
    } catch (err) {
      console.error('Error loading data:', err);
      toast.error(ERROR_MESSAGE);
    }
  };

  const onSubmit = (formData: any) => {
    const data = filterNullValues(formData);
    
    // Convert material_price to a number
    if (data.material_price) {
      data.material_price = Number(data.material_price);
    }
  
    if (isEditMode) {
      putApiCall(`/materials/${id}`, data)
        .then((_res) => {
          toast.success(RECORD_SAVED_SUCCESS);
          navigate('/materials');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    } else {
      postApiCall('/materials', data)
        .then((_res) => {
          toast.success(RECORD_UPDATED_SUCCESS);
          navigate('/materials');
        })
        .catch((err) => {
          console.log(err);
          toast.error(ERROR_MESSAGE);
        });
    }
  };

  return (
    <>
      <Breadcrumb pageName={isEditMode? "Edit Material": "Add Material"} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Material Information
          </h3>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
              <div className="mb-4.5">
                <InputField
                  name="material_name"
                  label="Name"
                  type="text"
                  required={true}
                  maxLength={100}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="material_description"
                  label="Description"
                  type="text"
                  required={false}
                  maxLength={500}
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="material_price"
                  label="Price"
                  type="number"
                  required={true}
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

export default AEMaterial;
