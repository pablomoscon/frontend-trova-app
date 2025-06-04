// src/components/common/SearchInput.tsx
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchInputProps } from '../../Interfaces/SharedInterface';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = '',
}) => (
  <div className='w-full md:w-96 mb-4'>
    <div className='relative'>
      <input
        type='text'
        placeholder={placeholder}
        className='w-full p-2 pr-10 rounded-md border border-gray-300 focus:outline-none'
        value={value}
        onChange={onChange}
      />
      <div className='absolute top-2 right-2'>
        <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
      </div>
    </div>
  </div>
);

export default SearchInput;
