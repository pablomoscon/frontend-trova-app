import React from 'react';
import { NavbarMobileIconsProps } from '../../../Interfaces/NavbarInterface';

const NavbarMobileIcons: React.FC<NavbarMobileIconsProps> = ({
  user,
  menuOpen,
  userMenuOpen,
  setMenuOpen,
  setUserMenuOpen,
}) => (
  <div className="md:hidden navbar-mobile flex items-center space-x-4 z-40">
    {user && (
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          if (userMenuOpen) {
            setUserMenuOpen(false);
          } else {
            setUserMenuOpen(true);
            setMenuOpen(false);
          }
        }}
        className="w-12 h-12 flex items-center justify-center text-black text-3xl focus:outline-none transition-all hover:opacity-80"
        aria-label="Toggle user menu"
      >
        {userMenuOpen ? (
          <span className="scale-90">✖</span>
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
        )}
      </button>
    )}
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        if (menuOpen) {
          setMenuOpen(false);
        } else {
          setMenuOpen(true);
          setUserMenuOpen(false);
        }
      }}
      className="w-12 h-12 flex items-center justify-center text-black text-3xl focus:outline-none transition-all hover:opacity-80"
      aria-label="Toggle main menu"
    >
      {menuOpen ? (
        <span className="scale-90">✖</span>
      ) : (
        <span className="text-3xl leading-none pb-1">☰</span>
      )}
    </button>
  </div>
);

export default NavbarMobileIcons;
