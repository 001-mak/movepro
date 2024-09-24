import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, FormProvider } from 'react-hook-form';
import { InputField } from '../../common/InputField';
import EmailTemplateMaker from '../../components/TextEditor/EmailTemplateMaker';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApiCall,putApiCall } from '../../services/api-service';
import { toast } from 'react-toastify';

function EditEmailTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const methods = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [content,setContent]= useState("");

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadData(id);
    }
  },[id]);
  useEffect(()=>{
    console.log(content)
  },[content])

  const loadData = async (id: string) => {
    await getApiCall(`/systememailtemplates/${id}`)
      .then((res) => {
        const{template,subject} = res.data
        setContent(res.data.content)
        console.log(res.data)
        methods.reset({template,subject});
      })
      .catch((err: any) => {
        console.error('Error loading data:', err);
      });
  };

  const onSubmit = async (data: any) => {
    console.log({...data,content});
    await putApiCall(`/systememailtemplates/${id}`,{...data,content})
    .then((res)=>{
      console.log(res.data)
      toast.success(`${data.template} Email Template Updated`)
    }).catch((error)=>{
      console.log(error)
      toast.error(`Error, please try again`)

    })

  };

  return (
    <div>
      <Breadcrumb pageName="Welcome Email Template" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Welcome Email
          </h3>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 py-4 px-6.5 sm:grid-cols-3">
              <div className="mb-4.5">
                <InputField
                  name="template"
                  label="Template Name"
                  type="text"
                  required={true}
                  errMsg="Template Name is required"
                />
              </div>

              <div className="mb-4.5">
                <InputField
                  name="subject"
                  label="Email Subject"
                  type="text"
                  required={true}
                  errMsg="Email Subject is required"
                />
              </div>
              <div className="col-span-3 mb-4.5">
                <EmailTemplateMaker content={content}  onContentChange={(newContent) => setContent(newContent)}
                  {...methods.register('content')}
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
    </div>
  );
}

export default EditEmailTemplate;
