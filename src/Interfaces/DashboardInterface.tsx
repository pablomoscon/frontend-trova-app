import { ComponentType } from "react";
import { Album } from "./AlbumInterface";
import { Artist } from "./ArtistInterface";

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

export interface AlbumDetailsModalProps {
  album: NonNullable<Artist['albums']>[0];
  onClose: () => void;
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

export interface DashboardSummaryProps {
  summary: {
    totalAlbums?: number;
    activeAlbums?: number;
    suspendedAlbums?: number;
    totalArtists?: number;
    activeArtist?: number;
    suspendedArtists?: number;
    totalUsers?: number;
    activeUsers?: number;
    suspendedUsers?: number; 
    deletedUsers?: number;
  } | null;
}

export interface DashboardSummaryCardProps {
  title: string;
  value: number | string | undefined;
  note?: string;
  color: string;
}

export interface DashboardChartSectionProps {
  title: string;
  data: any[];
  dataKey: string;
}

export interface AlbumDetailsListProps {
  albums: Album[];
  onOpenDetails: (album: Album) => void;
  onOpenImage: (url: string) => void;
}

export interface ArtistSectionProps {
  artist: Artist;
  onAlbumSelect: (album: NonNullable<Artist['albums']>[number]) => void;
  onImageOpen: (url: string) => void;
}
