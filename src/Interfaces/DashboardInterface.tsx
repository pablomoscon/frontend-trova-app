
export interface DashboardSideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface DashboardSubMenuProps {
  menuName: string;
  links: { label: string; href: string }[];
  activeMenu: string | null;
  toggleSubMenu: (menu: string) => void;
}

