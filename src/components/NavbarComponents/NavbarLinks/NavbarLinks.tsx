import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';


const NavbarLinks = ({ onClick }: { onClick?: () => void }) => {
  const { user } = useAuthContext();

  const links = [
    { to: '/artist', label: 'Artistas' },
    { to: '/novedades', label: 'Novedades' },
    { to: '/contact', label: 'Contacto' },
  ];
  
  if (!user) {
    links.push({ to: '/sign-in', label: 'Login' });
  }

  return (
    <>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          onClick={onClick}
          className='text-black hover:text-primary transition-all text-sm tracking-wide uppercase py-2'
        >
          {label}
        </Link>
      ))}
    </>
  );
};

export default NavbarLinks;