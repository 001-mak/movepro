import { useFormContext } from 'react-hook-form';

interface IinputField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export function InputField(props: IinputField) {
  const {
    name,
    label,
    type,
    required,
    maxLength,
    minLength,
    disabled,
    min,
    max,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();
  
  let pattern = undefined
  // Define the pattern for email validation
  if (type === 'email') {
    pattern = {
      value: /^\S+@\S+$/i,
      message: 'Please enter a valid email address in the format: example@domain.com'
    }
  }

  if (name === 'phone_no') {
    pattern = {
      value: /^\+?[1-9]\d{1,14}$/,
      message: 'Please enter a valid phone number in format, e.g., +1234567890'
    }
  }

  if (type === 'password') {
    pattern = {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).'

    }
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
          required: required ? { value: true, message: `${label} is required` } : false,
          pattern: pattern,
          maxLength: maxLength ? { value: maxLength, message: `Maximum length is ${maxLength} characters` } : undefined,
          minLength: minLength ? { value: minLength, message: `Minimum length is ${minLength} characters` } : undefined,
          min: min ? { value: min, message: `Minimum value is ${min}` } : undefined,
          max: max ? { value: max, message: `Maximum value is ${max}` } : undefined,
        })}
      />
      
      {/* Displaying error messages based on validation errors */}
      {errors[name]?.message && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}