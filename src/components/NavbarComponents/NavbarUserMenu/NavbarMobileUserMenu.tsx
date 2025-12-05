import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarMobileUserMenuProps } from '../../../Interfaces/NavbarInterface';

const NavbarMobileUserMenu: React.FC<NavbarMobileUserMenuProps> = ({
  logout,
  onClose,
}) => {
  return (
    <div className='mt-4 w-full px-6 text-black transition-all text-sm tracking-wide uppercase py-2'>
      <div className='flex flex-col items-center space-y-4'>
        {/* Perfil */}
        <Link
          to='/admin/admin-profile'
          className='text-gray-800 hover:underline'
          onClick={onClose} // ⬅️ aquí cerramos el menú
        >
          Perfil
        </Link>

        {/* Dashboard */}
        <Link
          to='/admin/dashboard'
          className='text-gray-800 hover:underline'
          onClick={onClose} // ⬅️ igual acá
        >
          Dashboard
        </Link>

        {/* Cerrar sesión */}
        <button
          onClick={() => {
            logout();
            onClose(); 
          }}
          className='text-black transition-all uppercase hover:underline'
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default NavbarMobileUserMenu;
