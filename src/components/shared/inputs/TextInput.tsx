import React from 'react';
import { TextInputProps } from '../../../Interfaces/AlbumInterface';

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = 'CD 1000',
  colSpan = 'sm:col-span-10',
  wrapperClass = '',
  type = 'text',
}) => (
  <div className={`${colSpan} ${wrapperClass}`}>
    <label
      htmlFor={name}
      className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 text-xs sm:text-sm text-gray-600'
    />
  </div>
);

export default TextInput;
