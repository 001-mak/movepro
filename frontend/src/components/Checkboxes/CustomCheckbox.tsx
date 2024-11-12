// CustomCheckbox.tsx
import React from 'react';

interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, checked, onChange, label }) => {
  return (
    <div className="flex items-center space-x-2 mb-5.5">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className=" opacity-0 absolute cursor-pointer"
        />
        <div 
          className={`w-4 h-4 border border-gray-300 rounded-sm cursor-pointer 
          ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white'}`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  );
};
export default CustomCheckbox;