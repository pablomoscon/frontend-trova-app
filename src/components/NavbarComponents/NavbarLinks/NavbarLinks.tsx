import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { NavbarLinksProps } from '../../../Interfaces/NavbarInterface';

const NavbarLinks: React.FC<NavbarLinksProps> = ({ onClick }) => {
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
