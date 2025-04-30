import { Link } from 'react-router-dom';

const NavbarMobileUserMenu = ({
  logout,
  onClose,
}: {
  logout: () => void;
  onClose: () => void;
}) => {
  return (
    <div className='mt-4 w-full px-6'>


      {/* Menú de opciones */}
      <div className=' flex flex-col items-center space-y-2'>
        <Link to='/perfil' className='text-sm text-gray-800 hover:underline'>
          Perfil
        </Link>
        <Link
          to='/configuracion'
          className='text-sm text-gray-800 hover:underline'
        >
          Configuración
        </Link>
        <button
          onClick={logout}
          className='text-sm text-red-600 hover:underline'
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default NavbarMobileUserMenu;
