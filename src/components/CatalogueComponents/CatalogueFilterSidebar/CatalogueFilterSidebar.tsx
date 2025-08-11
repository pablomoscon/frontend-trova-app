import React, { useState, useRef } from 'react';
import { FilterSidebarProps } from '../../../Interfaces/CatalogueInterface';
import { FilterSection } from './FilterSection';

const CatalogueFilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  scrollContainerRef,
}) => {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCheckboxChange = (sectionId: string, value: string) => {
    const sectionFilters = selectedFilters[sectionId] || [];
    const newFilters = sectionFilters.includes(value)
      ? sectionFilters.filter((v) => v !== value)
      : [...sectionFilters, value];

    onFilterChange({ ...selectedFilters, [sectionId]: newFilters });
  };

  const toggleSection = (sectionId: string) => {
    const isOpening = openSectionId !== sectionId;
    setOpenSectionId((prev) => (prev === sectionId ? null : sectionId));

    if (isOpening) {
      setTimeout(() => {
        const element = sectionRefs.current[sectionId];
        if (element) {
          const offset = 120;
          const container = scrollContainerRef?.current;

          if (container) {
            const containerTop = container.getBoundingClientRect().top;
            const targetTop = element.getBoundingClientRect().top;
            const scrollOffset = targetTop - containerTop - offset;

            container.scrollTo({
              top: container.scrollTop + scrollOffset,
              behavior: 'instant',
            });
          } else {
            const top =
              element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'instant' });
          }
        }
      }, 100);
    }
  };

  return (
    <form className='block pt-20 lg:pt-0'>
      <h3 className='sr-only'>Filtros</h3>

      {filters.map((section) => {
        const isOpen = openSectionId === section.id;

        return (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
          >
            <FilterSection
              section={section}
              isOpen={isOpen}
              selectedValues={selectedFilters[section.id] || []}
              onToggle={() => toggleSection(section.id)}
              onCheckboxChange={(value) =>
                handleCheckboxChange(section.id, value)
              }
            />
          </div>
        );
      })}
    </form>
  );
};

export default CatalogueFilterSidebar;
