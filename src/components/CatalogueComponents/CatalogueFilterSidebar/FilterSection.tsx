import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { formatGenre } from '../../../utils/formatGenreUtils';
import { FilterSectionProps } from '../../../Interfaces/CatalogueInterface';

export const FilterSection: React.FC<FilterSectionProps> = React.memo(
  ({ section, isOpen, selectedValues, onToggle, onCheckboxChange }) => {
    return (
      <div className='border-b border-gray-500 py-4'>
        <button
          type='button'
          onClick={onToggle}
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
                const checked = selectedValues.includes(option.value);

                return (
                  <div key={option.value} className='flex items-center'>
                    <input
                      id={`${section.id}-${idx}`}
                      name={`${section.id}[]`}
                      type='checkbox'
                      checked={checked}
                      onChange={() => onCheckboxChange(option.value)}
                      onClick={(e) => e.stopPropagation()}
                      className='h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label
                      htmlFor={`${section.id}-${idx}`}
                      className='ml-3 text-sm text-gray-600 truncate block'
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
  }
);
