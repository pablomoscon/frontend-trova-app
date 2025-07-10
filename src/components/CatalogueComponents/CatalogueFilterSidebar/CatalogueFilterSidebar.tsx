import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { FilterSidebarProps } from '../../../Interfaces/CatalogueInterface';

const CatalogueFilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
}) => {
  const handleCheckboxChange = (sectionId: string, value: string) => {
    const sectionFilters = selectedFilters[sectionId] || [];
    const newFilters = sectionFilters.includes(value)
      ? sectionFilters.filter((v) => v !== value)
      : [...sectionFilters, value];

    onFilterChange({ ...selectedFilters, [sectionId]: newFilters });
  };

  return (
    <form className='block pt-20 lg:pt-0'>
      <h3 className='sr-only'>Filtros</h3>

      {filters.map((section) => (
        <Disclosure
          key={section.id}
          as='div'
          className='border-b border-gray-500 py-4'
        >
          {({ open }) => (
            <>
              <DisclosureButton className='flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500'>
                <span className='font-medium text-gray-900'>
                  {section.name}
                </span>
                <span className='ml-6 flex items-center'>
                  {open ? (
                    <MinusIcon className='h-5 w-5' />
                  ) : (
                    <PlusIcon className='h-5 w-5' />
                  )}
                </span>
              </DisclosureButton>

              <DisclosurePanel className='pt-4'>
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
                          onClick={(e) => e.stopPropagation()} // 💡 evita que se cierre el panel
                          className='h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor={`${section.id}-${idx}`}
                          className='ml-3 text-sm text-gray-600'
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

export default CatalogueFilterSidebar;
