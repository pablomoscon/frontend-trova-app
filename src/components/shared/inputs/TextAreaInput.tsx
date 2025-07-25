import React from 'react';
import { TextAreaInputProps } from '../../../Interfaces/AlbumInterface';

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  name,
  value,
  onChange,
  rows = 3,
  colSpan = 'col-span-full',
}) => (
  <div className={colSpan}>
    <label
      htmlFor={name}
      className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
    >
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder='Escribe aquí los detalles...'
      className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:text-sm text-gray-600 text-xs'
    />
  </div>
);

export default TextAreaInput;
