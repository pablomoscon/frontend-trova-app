export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
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
}