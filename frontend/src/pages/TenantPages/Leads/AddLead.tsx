import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { FormProvider, useForm } from 'react-hook-form';
import { InputField } from '../../../common/InputField';
import { postApiCall } from '../../../services/api-service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddLead: React.FC = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const userState = useSelector((state: any) => state.auth.user);
  
  // Get current date and time in local timezone
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');

  useEffect(() => {
    // Get current date in YYYY-MM-DD format
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Get current time in HH:MM format
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    setMinDate(`${year}-${month}-${day}`);
    setMinTime(`${hours}:${minutes}`);
  }, []);

  const onSubmit = async (data: any) => {
    try {
      // Prepare lead data
      const leadData = {
        ...data,
        company_id: userState.company_id, // Use user's company_id
        phone_no: String(data.phone_no)
      };

      // API call to create lead
      const response = await postApiCall('/leads', leadData);
      
      toast.success('Lead created successfully');
      navigate('/all-leads'); // Redirect to leads list
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add New Lead" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Lead Information</h3>
          
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
                {/* First Name */}
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

                {/* Last Name */}
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

                {/* Email */}
                <div className="mb-4.5">
                  <InputField
                    name="email_id"
                    label="Email"
                    type="email"
                    required={true}
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-4.5">
                  <InputField
                    name="phone_no"
                    label="Phone Number"
                    type="number"
                    required={true}
                    minLength={10}
                    maxLength={15}
                  />
                </div>

                {/* Job Type */}
                <div className="mb-4.5">
                  <InputField
                    name="JobType"
                    label="Job Type"
                    type="text"
                    required={true}
                  />
                </div>

                {/* Service Type */}
                <div className="mb-4.5">
                  <InputField
                    name="ServiceType"
                    label="Service Type"
                    type="text"
                    required={true}
                  />
                </div>

                {/* Move Date */}
                <div className="mb-4.5">
                  <label htmlFor="MoveDate" className="mb-2.5 block text-black dark:text-white">
                    Move Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="date"
                    id="MoveDate"
                    {...methods.register('MoveDate', { 
                      required: 'Move Date is required' 
                    })}
                    min={minDate}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {methods.formState.errors.MoveDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {methods.formState.errors.MoveDate.message as string}
                    </p>
                  )}
                </div>

                {/* Move Time */}
                <div className="mb-4.5">
                  <label htmlFor="MoveTime" className="mb-2.5 block text-black dark:text-white">
                    Move Time <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="time"
                    id="MoveTime"
                    {...methods.register('MoveTime', { 
                      required: 'Move Time is required',
                      validate: (value) => {
                        // Get the selected date from the form
                        const selectedDate = methods.getValues('MoveDate');
                        const now = new Date();
                        
                        // If selected date is today, validate time
                        if (selectedDate === minDate) {
                          const [hours, minutes] = value.split(':').map(Number);
                          const selectedTime = new Date();
                          selectedTime.setHours(hours, minutes);
                          
                          // Compare with current time
                          if (selectedTime < now) {
                            return 'Selected time cannot be in the past';
                          }
                        }
                        return true;
                      }
                    })}
                    min={minDate === methods.getValues('MoveDate') ? minTime : undefined}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {methods.formState.errors.MoveTime && (
                    <p className="mt-1 text-sm text-red-600">
                      {methods.formState.errors.MoveTime.message as string}
                    </p>
                  )}
                </div>

                {/* Loading City */}
                <div className="mb-4.5">
                  <InputField
                    name="LoadingCity"
                    label="Loading City"
                    type="text"
                    required={true}
                  />
                </div>

                {/* Unloading City */}
                <div className="mb-4.5">
                  <InputField
                    name="UnloadingCity"
                    label="Unloading City"
                    type="text"
                    required={true}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mb-5.5 flex items-end col-12">
                <input
                  type="submit"
                  value="Create Lead"
                  className="flex w-full lg:w-1/5 items-end justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default AddLead;