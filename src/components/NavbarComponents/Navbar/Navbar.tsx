import React, { useRef, useState } from 'react';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobileIcons from './NavbarMobileIcons';
import NavbarMobileNav from './NavbarMobileNav';
import NavbarMobileUserMenu from '../NavbarUserMenu/NavbarMobileUserMenu';
import { useNavbarEffects } from '../../../hooks/navbar/useNavbarEffects.ts';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthContext();
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeAllMenus = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  };

  useNavbarEffects({
    wrapperRef,
    closeAllMenus,
    location,
    setSearchOpen,
    setSearchValue,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const executeSearch = () => {
    if (searchValue.trim().length > 0) {
      navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') executeSearch();
  };

  const handleSearchClick = () => {
    executeSearch();
  };

  return (
    <header className='fixed top-0 left-0 w-full bg-[#E6E7D9] backdrop-blur-lg shadow-md z-50'>
      <div ref={wrapperRef}>
        <div className='w-full max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between min-h-[60px] relative'>
          <div className='flex-shrink-0'>
            <NavbarLogo />
          </div>

          <div className='hidden md:flex flex-col items-end'>
            <NavbarDesktop
              user={user}
              logout={logout}
              searchOpen={searchOpen}
              toggleSearch={() => setSearchOpen((prev) => !prev)}
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              onSearchEnter={handleSearchEnter}
              onSearchClick={handleSearchClick}
            />
          </div>

          <NavbarMobileIcons
            user={user}
            menuOpen={menuOpen}
            userMenuOpen={userMenuOpen}
            setMenuOpen={setMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
          />
        </div>

        {menuOpen && (
          <div className='w-full overflow-hidden md:hidden'>
            <NavbarMobileNav
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              onSearchEnter={handleSearchEnter}
              onSearchClick={handleSearchClick}
            />
          </div>
        )}

        {user && userMenuOpen && (
          <div className='md:hidden bg-[#E6E7D9] px-6 pb-4'>
            <NavbarMobileUserMenu
              logout={logout}
              onClose={() => setUserMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
