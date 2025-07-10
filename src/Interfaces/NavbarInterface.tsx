export interface NavbarLinksProps {
  onClick?: () => void;
}

export interface NavbarUserMenuProps {
  logout: () => void;
  username: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}


export interface NavbarMobileUserMenuProps {
  logout: () => void;
  onClose: () => void;
}