import React from 'react';
import { ContactInputFieldProps } from '../../../Interfaces/ContactInterface';

const InputField: React.FC<ContactInputFieldProps> = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  autoComplete,
  placeholder,
  rows,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-semibold text-gray-900 mt-5'
      >
        {label}
      </label>
      <div className='mt-2.5'>
        {type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            value={value} 
            onChange={onChange} 
            rows={rows}
            className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
            placeholder={placeholder}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value} 
            onChange={onChange}
            placeholder={placeholder}
            className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
