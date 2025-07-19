import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchInputProps } from '../../Interfaces/SharedInterface';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onEnter,
  onSearchClick,
  placeholder = '',
  className = '',
}) => (
  <div className={`${className}`}>
    <div className='relative'>
      <input
        type='text'
        placeholder={placeholder}
        className='w-full p-1 pr-10 rounded-md border border-gray-300 focus:outline-none'
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) onEnter(e);
        }}
      />
      <button
        type='button'
        className='absolute top-1/2 right-2 transform -translate-y-1/2'
        onClick={() => {
          if (onSearchClick) onSearchClick();
        }}
        aria-label='Buscar'
      >
        <MagnifyingGlassIcon className='h-5 w-5 text-gray-500 cursor-pointer' />
      </button>
    </div>
  </div>
);


export default SearchInput;
