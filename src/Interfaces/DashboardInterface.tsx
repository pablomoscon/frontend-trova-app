import { ComponentType } from "react";

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

export interface SidebarItemProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export interface SubItem {
  label: string;
  href: string;
}

export interface SidebarSubmenuProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subitems: SubItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export interface MenuSubItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  icon: ComponentType<{ className?: string }>;
  key: string;
  href?: string;
  subitems?: MenuSubItem[];
}
