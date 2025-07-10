import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { NavbarUserMenuProps } from '../../../Interfaces/NavbarInterface';


const NavbarUserMenu: React.FC<NavbarUserMenuProps> = ({
  logout,
  username,
  isOpen,
  onToggle,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  const handleInternalClick = () => onClose(); // close after navigation / logout

  return (
    <div ref={menuRef} className='relative inline-block text-left'>
      <button
        onClick={onToggle}
        className='inline-flex justify-center items-center w-full p-0 focus:outline-none focus:ring-offset-2'
        aria-label='Menú de usuario'
      >
        <UserCircleIcon
          className='h-12 w-12 text-gray-700'
          aria-hidden='true'
        />
        <ChevronDownIcon
          className={`ml-2 h-5 w-5 text-gray-700 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden='true'
        />
      </button>

      {isOpen && (
        <div
          className='absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='px-4 py-3 border-b border-gray-200'>
            <div className='text-lg font-semibold text-gray-900'>
              {username}
            </div>
          </div>

          <div className='py-1'>
            <Link
              to='/admin/admin-profile'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              onClick={handleInternalClick}
            >
              Perfil
            </Link>
            <Link
              to='/admin/dashboard'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              onClick={handleInternalClick}
            >
              Dashboard
            </Link>
          </div>

          <div className='border-t border-gray-200' />

          <div className='py-1'>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarUserMenu;
