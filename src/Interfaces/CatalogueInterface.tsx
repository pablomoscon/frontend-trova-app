export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

export type SelectedFilters = Record<string, string[]>;

export interface MobileFilterDialogProps {
  open: boolean;
  onClose: () => void;
  filters: FilterSection[];
  selectedFilters: SelectedFilters; // ⬅️ agregado
  onFilterChange: (selectedFilters: SelectedFilters) => void;
}

export interface FilterSidebarProps {
  filters: FilterSection[];
  selectedFilters: SelectedFilters; // ⬅️ agregado
  onFilterChange: (selectedFilters: SelectedFilters) => void;
}

export interface SortOption {
  name: string;
  href: string;
  current: boolean;
}

export interface SortMenuProps {
  sortOptions: SortOption[];
}
