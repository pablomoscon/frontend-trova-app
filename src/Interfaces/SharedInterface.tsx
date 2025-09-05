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
export interface SortOption<T extends string> {
  name: string;
  value: T;
}
export interface SortMenuProps<T extends string> {
  sortOptions: { name: string; value: T }[];
  selectedSort: T;
  setSelectedSort: (value: T) => void;
}

export type ScrollTarget =
  | RefObject<HTMLElement | null>
  | (() => { top: number; left: number })
  | null;

  export interface PageSizeSelectorProps {
  pageSize: number;
  onChange: (value: number) => void;
  }

  export interface LazyImageProps {
    src: string;
    alt: string;
    placeholderSrc: string;
    objectFit?: 'cover' | 'contain';
    className?: string;
    containerClassName?: string;
    onClick?: () => void;
  }

  export interface ScrollContextType {
    disableGlobalScroll: boolean;
    setDisableGlobalScroll: (v: boolean) => void;
  }

export interface UseScrollOptions {
  deps?: any[];
  behavior?: 'auto' | 'instant' | 'smooth';
  offset?: number;
  enabled?: boolean;
  scrollOnMount?: boolean;
}