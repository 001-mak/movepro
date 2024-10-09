// import { useFormContext } from 'react-hook-form';

// interface IinputField {
//   name: string;
//   label: string;
//   type: string;
//   required: boolean;
//   maxLength?: number;
//   errMsg?: string;
//   disabled?:boolean;
//   min?:number;
// }

// export function InputField(props: IinputField) {
//   const { name, label, type, required, maxLength, errMsg,disabled,min, ...rest } = props;
//   const { register, formState:{errors} } = useFormContext()
//   let pattern = undefined;
//   if(type ==="email"){
//     pattern = /^\S+@\S+$/i;
//   }
//   return (
//     <div>
//       <label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
//         {label} {required&&<span className="text-meta-1">*</span>}
//       </label>
//       {type ==='number'?
//         <input
//         className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//         type={type}
//         placeholder={label}
//         disabled={disabled?? false}
//         {...register(name, {
//           required: required,
//           maxLength: maxLength,
//           valueAsNumber: true,
//           min,
//         })}
//         onChange={(e)=>parseInt(e.target.value)}
//         />
//       :
//         <input
//         className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//         type={type}
//         placeholder={label}
//         disabled={disabled?? false}
//         {...register(name, {
//           pattern: pattern,
//           required: required,
//           maxLength: maxLength,
//           min,
//           valueAsNumber: false,
//         })}
//         />
//       }
//       {errors[name] && <p className="mt-1 text-sm text-red-600">{errMsg}</p>}
//     </div>
//   );
// }

// ------------------------------------------------------------------
// ------------------------------------------------------------------

import { useFormContext } from 'react-hook-form';

interface IinputField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  maxLength?: number;
  errMsg?: string;
  disabled?: boolean;
  min?: number;
}

export function InputField(props: IinputField) {
  const {
    name,
    label,
    type,
    required,
    maxLength,
    errMsg,
    disabled,
    min,
    ...rest
  } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  let pattern = undefined;
  if (type === 'email') {
    pattern = /^\S+@\S+$/i;
  }
  return (
    <div>
      <label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <input
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        type={type}
        placeholder={label}
        disabled={disabled ?? false}
        {...register(name, {
          pattern: pattern,
          required: required,
          maxLength: maxLength,
          min,
          valueAsNumber: false,
        })}
      />
      {errors[name] && <p className="mt-1 text-sm text-red-600">{errMsg}</p>}
    </div>
  );
}
