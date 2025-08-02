import { Link } from 'react-router-dom';

const NavbarLogo = () => (
  <Link to='/' className='flex items-center z-50 ml-8'>
    <img
      src='/assets/trova_logo.png'
      alt='Trova Logo'
      className='h-22 w-auto object-contain filter opacity-90 transition-all ease-in-out duration-300 max-[500px]:h-18'
    />
  </Link>
);

export default NavbarLogo;
