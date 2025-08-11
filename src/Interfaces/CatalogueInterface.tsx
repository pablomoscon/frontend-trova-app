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
  selectedFilters: SelectedFilters;
  onFilterChange: (selectedFilters: SelectedFilters) => void;
}

export interface FilterSectionProps {
  section: FilterSection;
  isOpen: boolean;
  selectedValues: string[];
  onToggle: () => void;
  onCheckboxChange: (value: string) => void;
}


export interface FilterSidebarProps {
  filters: FilterSection[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string[]>) => void;
  onAnyFilterChange?: () => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export interface CatalogueHeaderProps {
  onMobileFiltersOpen: () => void;
  sortOrder: 'asc' | 'desc' | '';
  setSortOrder: (order: 'asc' | 'desc' | '') => void;
}