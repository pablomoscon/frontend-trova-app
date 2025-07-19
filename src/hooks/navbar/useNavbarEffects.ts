import { useEffect } from 'react';
import { useCloseOnOutside } from '../shared/useCloseOnOutside';
import { useCloseOnResize } from '../shared/useCloseOnResize';
import { useCloseOnRouteChange } from '../shared/useCloseOnRouteChange';
import { UseNavbarEffectsProps } from '../../Interfaces/NavbarInterface';

export const useNavbarEffects = ({
  wrapperRef,
  closeAllMenus,
  location,
  setSearchOpen,
  setSearchValue,
}: UseNavbarEffectsProps) => {
  useCloseOnOutside(wrapperRef, closeAllMenus);
  useCloseOnResize(closeAllMenus);
  useCloseOnRouteChange(closeAllMenus);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      const query = params.get('query') ?? '';
      if (query !== '') {
        setSearchValue(query);
      }
      setSearchOpen(false);
    }
  }, [location, setSearchOpen, setSearchValue]);

  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearchValue('');
    }
  }, [location.pathname, setSearchValue]);
};
