export interface NavbarLinksProps {
  onClick?: () => void;
}

export interface NavbarUserMenuProps {
  logout: () => void;
  username: string;
}