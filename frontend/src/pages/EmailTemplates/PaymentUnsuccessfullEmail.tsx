import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, FormProvider } from 'react-hook-form';
import { InputField } from '../../common/InputField';
import EmailTemplateMaker from '../../components/TextEditor/EmailTemplateMaker';

function PaymentUnsuccessfullEmail() {
  const methods = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  

  return (
    <div>
      <Breadcrumb pageName="Payment Success Email Template" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Payment Success Email
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
                  name="firstname"
                  label="First Name"
                  type="text"
                  required={true}
                  errMsg="First Name is required"
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
        <EmailTemplateMaker />
      </div>
    </div>
  );
}

export default PaymentUnsuccessfullEmail;
