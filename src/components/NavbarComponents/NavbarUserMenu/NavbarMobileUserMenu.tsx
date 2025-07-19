import { Link } from 'react-router-dom';
import { NavbarMobileUserMenuProps } from '../../../Interfaces/NavbarInterface';

const NavbarMobileUserMenu: React.FC<NavbarMobileUserMenuProps> = ({
  logout
}) => {

  return (
    <div className='mt-4 w-full px-6 text-black hover:text-primary transition-all text-sm tracking-wide uppercase py-2'>
      <div className=' flex flex-col items-center space-y-4 '>
        <Link
          to='/admin/admin-profile'
          className='text-gray-800 hover:underline'
        >
          Perfil
        </Link>
        <Link to='/admin/dashboard' className='text-gray-800 hover:underline'>
          Configuración
        </Link>
        <button
          onClick={logout}
          className='text-black transition-all uppercase hover:underline '
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default NavbarMobileUserMenu;
