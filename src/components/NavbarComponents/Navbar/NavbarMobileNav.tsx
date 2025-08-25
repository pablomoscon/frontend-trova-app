import React from 'react';
import { NavbarMobileNavProps } from '../../../Interfaces/NavbarInterface';
import NavbarLinks from './NavbarLinks';
import SearchInput from '../../shared/SearchInput';

const NavbarMobileNav: React.FC<NavbarMobileNavProps> = ({
  isOpen,
  onClose,
  searchValue,
  onSearchChange,
  onSearchEnter,
  onSearchClick,
}) => {
  return (
    <div
      className={`
        md:hidden fixed right-0 h-[calc(100vh-80px)] w-[55vw] max-w-xs min-w-[180px]
        bg-[#E6E7D9] z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col items-end px-6 py-6 space-y-6 border-l border-gray-300
      `}
    >
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        onEnter={onSearchEnter}
        onSearchClick={onSearchClick}
        placeholder='Buscar...'
        className='bg-gray-100 text-gray-700'
      />
      <div className='flex flex-col items-end space-y-4 text-base sm:text-sm max-[400px]:text-xs break-words max-w-full'>
        <NavbarLinks onClick={onClose} />
      </div>
    </div>
  );
};


export default NavbarMobileNav;
