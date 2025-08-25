import { RefObject } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  className?: string;
  onSearchClick?: () => void;
}

export interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
  wrapperClass?: string;
  colSpan?: string;
}

export interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

export interface PaginationControlsProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  onPageChangeComplete?: () => void;
}

export interface useScrollOptions {
  deps?: any[];
  behavior?: ScrollBehavior;
  offset?: number;
  enabled?: boolean;
}

export interface SortOption {
  name: string;
  value: string;
}
export interface SortMenuProps {
  sortOptions: SortOption[];
  selectedSort: 'asc' | 'desc' | ''; 
  setSelectedSort: (value: 'asc' | 'desc' | '') => void;
}

export type ScrollTarget =
  | RefObject<HTMLElement | null>
  | (() => { top: number; left: number })
  | null;

  export interface PageSizeSelectorProps {
  pageSize: number;
  onChange: (value: number) => void;
}