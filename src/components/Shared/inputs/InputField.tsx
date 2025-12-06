import React from 'react';
import { InputFieldProps } from '../../../Interfaces/AuthInterface';

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
}) => (
  <div className='mb-4'>
    {label && (
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm
        ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        }
      `}
    />
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
  </div>
);

export default InputField;
