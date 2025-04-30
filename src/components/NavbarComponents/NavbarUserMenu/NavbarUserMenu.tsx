import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid';

const NavbarUserMenu = ({
  logout,
  username,
}: {
  logout: () => void;
  username: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar el cierre del menú al hacer clic en una opción
  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='inline-flex justify-center items-center w-full p-0 focus:outline-none focus:ring-offset-2'
          aria-label='Menú de usuario' // Agregado el aria-label para accesibilidad
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
      </div>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
          {/* Nombre de usuario estilizado */}
          <div className='px-4 py-3 border-b border-gray-200'>
            <div className='text-lg font-semibold text-gray-900'>
              {username}
            </div>
          </div>

          <div className='py-1'>
            <Link
              to='/perfil'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              aria-label='Ir al perfil de usuario' // Agregado el aria-label
              onClick={handleMenuClick} // Cierra el menú al hacer clic
            >
              Perfil
            </Link>
            <Link
              to='/admin/dashboard'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              aria-label='Ir al panel de administración' // Agregado el aria-label
              onClick={handleMenuClick} // Cierra el menú al hacer clic
            >
              Dashboard
            </Link>
          </div>

          <div className='border-t border-gray-200'></div>

          <div className='py-1'>
            <button
              onClick={() => {
                logout();
                handleMenuClick(); // Cierra el menú al hacer clic
              }}
              className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              aria-label='Cerrar sesión' // Agregado el aria-label
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
