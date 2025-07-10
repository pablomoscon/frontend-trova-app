import { RefObject } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
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

export type ScrollTarget =
  | RefObject<HTMLElement | null>
  | (() => { top: number; left: number })
  | null;