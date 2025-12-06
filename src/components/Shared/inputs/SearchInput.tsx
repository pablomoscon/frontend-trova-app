import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import InputWithActionButton from './InputWithActionButton';
import { SearchInputProps } from '../../../Interfaces/SharedInterface';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onEnter,
  onSearchClick,
  placeholder = '',
  className = '',
}) => {
  const handleButtonClick = () => {
    if (value) {
      onChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    } else if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <InputWithActionButton
      value={value}
      onChange={onChange}
      onEnter={onEnter}
      onButtonClick={handleButtonClick}
      placeholder={placeholder}
      className={className}
      isEmptyIcon={<MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />}
      hasValueIcon={
        <XMarkIcon className='h-5 w-5 text-gray-500 cursor-pointer' />
      }
    />
  );
};

export default SearchInput;
