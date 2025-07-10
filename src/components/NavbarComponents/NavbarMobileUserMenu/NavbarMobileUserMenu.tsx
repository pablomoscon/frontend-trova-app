import { Link } from 'react-router-dom';
import { NavbarMobileUserMenuProps } from '../../../Interfaces/NavbarInterface';


const NavbarMobileUserMenu: React.FC<NavbarMobileUserMenuProps> = ({
  logout,
  onClose,
}) => (
  <div className='mt-4 w-56 px-6 mx-auto'>
    <div className='flex flex-col items-center space-y-2'>
      <Link
        to='/perfil'
        className='text-sm text-gray-800 hover:underline'
        onClick={onClose}
      >
        Perfil
      </Link>

      <Link
        to='/configuracion'
        className='text-sm text-gray-800 hover:underline'
        onClick={onClose}
      >
        Configuración
      </Link>

      <button
        onClick={() => {
          logout();
          onClose();
        }}
        className='text-sm text-red-600 hover:underline'
      >
        Cerrar sesión
      </button>
    </div>
  </div>
);

export default NavbarMobileUserMenu;
