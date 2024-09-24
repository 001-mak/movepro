import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, FormProvider } from 'react-hook-form';
import { InputField } from '../../common/InputField';
import { AdminUserRoles,TenantUserRoles, ERROR_MESSAGE, PASSWORD_MISMATCH_ERROR_MESSAGE, RECORD_SAVED_SUCCESS, Roles } from '../../common/constants';
import { SelectOptionValue, SelectOption } from '../../common/SelectOption';
import { getApiCall, postApiCall, putApiCall } from '../../services/api-service';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { filterNullValues } from '../../common/filterNullVal';

function AEAdminUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const methods = useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  function getUserFromLocalStorage(): any | null {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch (error) {
      console.error('Error retrieving user from localStorage:', error);
      return null;
    }
  }

  let roles: SelectOptionValue[];
  const user = getUserFromLocalStorage()
  if(parseInt(user.company_id) > 0){
    roles = Roles.filter(
      (x) => TenantUserRoles.findIndex((y) => y == x.id) != -1,
    ).map((role) => ({
      Label: role.role_name,
      Value: role.id,
    }));
  }else{ 
    roles = Roles.filter(
      (x) => AdminUserRoles.findIndex((y) => y == x.id) != -1,
    ).map((role) => ({
      Label: role.role_name,
      Value: role.id,
    }));
  }
    
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadUserData(id);
    }
  }, [id]);

  const loadUserData = async (userId: string) => {
    await getApiCall(`/users/${userId}`)
      .then((res) => {
        methods.reset(res.data);
      })
      .catch((err: any) => {
        console.error('Error loading user data:', err);
      });
  };

  const onSubmit = (data: any) => {
    if(data.password != data.confirmpassword){
      toast.error(PASSWORD_MISMATCH_ERROR_MESSAGE);
      return
    }
    let {confirmpassword, ... body} = data;
    if(isEditMode){
      body = filterNullValues(body);
      putApiCall(`/users/${id}`, body).then((_res) => {
        toast.success(RECORD_SAVED_SUCCESS);
        navigate('/users');
      }).catch((err) => {
        console.log(err);
        toast.error(ERROR_MESSAGE);
      });
    }else{
      body = filterNullValues(body);
      postApiCall('/users', body).then((_res) => {
        toast.success(RECORD_SAVED_SUCCESS);
        navigate('/users');
      }).catch((err) => {
        console.log(err);
        toast.error(ERROR_MESSAGE);
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName={isEditMode ? "Edit User" : "Add User"}/>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            User Information
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
                  disabled={isEditMode}
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
                  name="email_id"
                  label="Email"
                  type="email"
                  required={true}
                  disabled={isEditMode}
                  errMsg="Email is required"
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="phone_no"
                  label="Phone Number"
                  type="text"
                  required={true}
                  errMsg="Phone Number is required"
                />
              </div>

              <div className="mb-5.5">
                <InputField
                  name="alter_phone_no"
                  label="Alternate Phone Number"
                  type="text"
                  required={false}
                  errMsg=""
                />
              </div>

              <div className="mb-5.5">
                <SelectOption
                  name="role"
                  label="Role"
                  required={true}
                  value={roles}
                  errMsg="Role is required"
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
              {/* <br></br> */}

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

export default AEAdminUser;
