import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import NavbarLinks from '../NavbarLinks/NavbarLinks';
import NavbarUserMenu from '../NavbarUserMenu/NavbarUserMenu';
import NavbarMobileUserMenu from '../NavbarMobileUserMenu/NavbarMobileUserMenu';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';

const Navbar: React.FC = () => {
  const [linksOpen, setLinksOpen] = useState(false);
  const [mobileUserOpen, setMobileUserOpen] = useState(false);
  const [desktopUserOpen, setDesktopUserOpen] = useState(false);

  const { user, logout } = useAuthContext();

  const navbarRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setLinksOpen(false);
    setMobileUserOpen(false);
    setDesktopUserOpen(false);
  }, []);

  useCloseOnOutside(navbarRef, closeAll);

  const someMenuOpen = linksOpen || mobileUserOpen || desktopUserOpen;

  return (
    <>
      <header
        ref={navbarRef}
        className='fixed top-0 left-0 w-full bg-[#E6E7D9] backdrop-blur-lg shadow-md z-50'
      >
        <div className='w-full max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center min-h-[60px]'>
          {/* ---------- Logo ---------- */}
          <Link
            to='/'
            className='flex items-center z-50 ml-8'
            onClick={closeAll}
          >
            <img
              src='/src/assets/trova_logo.png'
              alt='Trova Logo'
              className='h-20 w-auto object-contain filter opacity-90 transition-all ease-in-out duration-300 max-[500px]:h-14'
            />
          </Link>

          {/* ---------- MENÚ DESKTOP ---------- */}
          <nav className='hidden md:flex space-x-8 items-center'>
            <NavbarLinks onClick={closeAll} />
            {user && (
              <NavbarUserMenu
                logout={logout}
                username={user.username}
                isOpen={desktopUserOpen}
                onToggle={() => setDesktopUserOpen((o) => !o)}
                onClose={closeAll}
              />
            )}
          </nav>

          {/* ---------- ÍCONOS MOBILE ---------- */}
          <div className='md:hidden flex items-center space-x-4 z-50'>
            {user && (
              <button
                onClick={() => {
                  setMobileUserOpen((o) => !o);
                  setLinksOpen(false);
                }}
                className='w-12 h-12 flex items-center justify-center text-black text-3xl focus:outline-none transition-all hover:opacity-80'
              >
                {mobileUserOpen ? (
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
                setLinksOpen((o) => !o);
                setMobileUserOpen(false);
              }}
              className='w-12 h-12 flex items-center justify-center text-black text-3xl focus:outline-none transition-all hover:opacity-80'
            >
              {linksOpen ? (
                <span className='scale-90'>✖</span>
              ) : (
                <span className='text-3xl leading-none pb-1'>☰</span>
              )}
            </button>
          </div>
        </div>

        {/* ----------  LINKS PANEL (mobile) ---------- */}
        <div
          className={`md:hidden flex flex-col items-center bg-[#E6E7D9] transition-all duration-300 ${
            linksOpen
              ? 'max-h-64 opacity-100 py-4 z-40'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <NavbarLinks onClick={closeAll} />
        </div>

        {/* ---------- DROPDOWN USUARIO (mobile) ---------- */}
        {user && mobileUserOpen && (
          <div className='md:hidden bg-[#E6E7D9] px-6 pb-4 relative z-[50]'>
            <NavbarMobileUserMenu logout={logout} onClose={closeAll} />
          </div>
        )}
      </header>

      {/* ---------- OVERLAY ---------- */}
      {someMenuOpen && (
        <div className='fixed inset-0 z-40' onClick={closeAll} />
      )}
    </>
  );
};

export default Navbar;
