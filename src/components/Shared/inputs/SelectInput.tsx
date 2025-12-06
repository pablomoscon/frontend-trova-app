import React from 'react';
import { SelectInputProps } from '../../../Interfaces/SharedInterface';

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Seleccioná una opción',
  error,
  wrapperClass = '',
  colSpan = '',
}) => (
  <div className={`${colSpan} ${wrapperClass}`}>
    <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-700'
    >
      <option value='' disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
  </div>
);

export default SelectInput;
