import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLinks from '../NavbarLinks/NavbarLinks';
import NavbarUserMenu from '../NavbarUserMenu/NavbarUserMenu';
import NavbarMobileUserMenu from '../NavbarMobileUserMenu/NavbarMobileUserMenu';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();

  return (
    <header className='fixed top-0 left-0 w-full bg-[#E6E7D9] backdrop-blur-lg shadow-md z-50'>
      <div className='w-full max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center min-h-[60px] relative'>
        {/* Logo (Trova) */}
        <Link to='/' className='flex items-center z-50 ml-8'>
          <img
            src='/src/assets/trova_logo.png'
            alt='Trova Logo'
            className='h-20 w-auto object-contain filter opacity-90 transition-all ease-in-out duration-300 max-[500px]:h-14 '
          />
        </Link>

        {/* Desktop Menu */}
        <nav className='hidden md:flex space-x-8 items-center'>
          <NavbarLinks />
          {user && <NavbarUserMenu logout={logout} username={user.username}  />}
        </nav>

        {/* Mobile: User Icon + Burger Menu */}
        <div className='md:hidden navbar-mobile flex items-center space-x-4 z-40'>
          {user && (
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setMenuOpen(false);
              }}
              className='w-12 h-12 flex items-center justify-center text-black text-3xl focus:outline-none transition-all hover:opacity-80'
            >
              {userMenuOpen ? (
                <span className='scale-90'>✖</span>
              ) : (
                <img
                  src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png'
                  alt='Avatar'
                  className='w-9 h-9 rounded-full object-cover'
                />
              )}
            </button>
          )}

          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setUserMenuOpen(false);
            }}
            className='w-12 h-12 flex items-center justify-center text-black text-3xl focus:outline-none transition-all hover:opacity-80'
          >
            {menuOpen ? (
              <span className='scale-90'>✖</span>
            ) : (
              <span className='text-3xl leading-none pb-1'>☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden flex flex-col items-center bg-[#E6E7D9] transition-all duration-300 ${
          menuOpen
            ? 'max-h-64 opacity-100 py-4 z-40'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <NavbarLinks onClick={() => setMenuOpen(false)} />
      </div>

      {/* Mobile User Dropdown */}
      {user && userMenuOpen && (
        <div className='md:hidden bg-[#E6E7D9] px-6 pb-4'>
          <NavbarMobileUserMenu
            logout={logout}
            onClose={() => setUserMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
