import React, { useState, useRef } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { FilterSidebarProps } from '../../../Interfaces/CatalogueInterface';
import { formatGenre } from '../../../utils/formatGenreUtils';

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
            className='border-b border-gray-500 py-4'
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
          >
            <button
              type='button'
              onClick={() => toggleSection(section.id)}
              className='flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500'
            >
              <span className='font-medium text-gray-900'>{section.name}</span>
              <span className='ml-6 flex items-center'>
                {isOpen ? (
                  <MinusIcon className='h-5 w-5' />
                ) : (
                  <PlusIcon className='h-5 w-5' />
                )}
              </span>
            </button>

            {isOpen && (
              <div className='pt-4'>
                <div className='space-y-4'>
                  {section.options.map((option, idx) => {
                    const checked =
                      selectedFilters[section.id]?.includes(option.value) ||
                      false;

                    return (
                      <div key={option.value} className='flex items-center'>
                        <input
                          id={`${section.id}-${idx}`}
                          name={`${section.id}[]`}
                          type='checkbox'
                          checked={checked}
                          onChange={() =>
                            handleCheckboxChange(section.id, option.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                          className='h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor={`${section.id}-${idx}`}
                          className='ml-3 text-sm text-gray-600 text-start truncate max-w-full block'
                          title={option.label}
                        >
                          {section.id === 'genre'
                            ? formatGenre(option.label)
                            : option.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </form>
  );
};
export default CatalogueFilterSidebar;
