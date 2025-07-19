import { RefObject } from "react";
import { User } from "./UserInterface";
import { Location } from 'react-router-dom';

export interface NavbarLinksProps {
  onClick?: () => void;
}

export interface NavbarMobileIconsProps {
  user: User | null;
  menuOpen: boolean;
  userMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setUserMenuOpen: (open: boolean) => void;
}
  
export interface NavbarDesktopProps {
  user: User | null;
  logout: () => void;
  searchOpen: boolean;
  toggleSearch: () => void;
  onSearchClick: () => void;
}

export interface NavbarUserMenuProps {
  logout: () => void;
  username: string;
}

export interface NavbarMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

export interface NavbarMobileUserMenuProps {
  isOpen: boolean;
  logout: () => void;
  onClose: () => void;
}

export interface UseNavbarEffectsProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  closeAllMenus: () => void;
  location: Location;
  setSearchOpen: (value: boolean) => void;
  setSearchValue: (value: string) => void;
}

