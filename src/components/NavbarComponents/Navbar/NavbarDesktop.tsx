import React from 'react';
import NavbarLinks from './NavbarLinks';
import NavbarUserMenu from '../NavbarUserMenu/NavbarUserMenu';
import NavbarSearchToggle from './NavbarSearchToggle';
import SearchInput from '../../Shared/SearchInput';
import { NavbarDesktopProps } from '../../../Interfaces/NavbarInterface';

const NavbarDesktop: React.FC<
  NavbarDesktopProps & {
    searchValue: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }
> = ({
  user,
  logout,
  searchOpen,
  toggleSearch,
  searchValue,
  onSearchChange,
  onSearchEnter,
  onSearchClick,
}) => (
  <div className='flex flex-col w-full'>
    <nav className='flex items-center space-x-6'>
      <NavbarLinks />
      <NavbarSearchToggle isOpen={searchOpen} onToggle={toggleSearch} />
      {user && <NavbarUserMenu logout={logout} username={user.username} />}
    </nav>

    {searchOpen && (
      <div className='pt-3'>
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          onEnter={onSearchEnter}
          onSearchClick={onSearchClick}
          placeholder='Buscar...'
          className='w-64 bg-gray-100 text-gray-700'
        />
      </div>
    )}
  </div>
);

export default NavbarDesktop;
