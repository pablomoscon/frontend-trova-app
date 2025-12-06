import React from 'react';
import { SongFieldProps } from '../../../../Interfaces/SongInterface';

const SongField: React.FC<SongFieldProps> = ({
  value,
  placeholder,
  onChange,
}) => (
  <input
    type='text'
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    className='input sm:w-1/2 border border-gray-300 rounded-md p-2'
  />
);

export default SongField;
