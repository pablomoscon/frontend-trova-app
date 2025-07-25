import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { SortMenuProps } from '../../Interfaces/SharedInterface';

const SortMenu: React.FC<SortMenuProps> = ({
  sortOptions,
  selectedSort,
  setSelectedSort,
}) => {
  const current = sortOptions.find((option) => option.value === selectedSort);

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <MenuButton className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
          Ordenar: {current?.name}
          <ChevronDownIcon
            className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
            aria-hidden='true'
          />
        </MenuButton>
      </div>

      <MenuItems className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <div className='py-1'>
          {sortOptions.map((option) => (
            <MenuItem key={option.value}>
              {({ disabled }) => (
                <button
                  onClick={() =>
                    setSelectedSort(option.value as 'asc' | 'desc')
                  }
                  className={`${
                    disabled ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block w-full px-4 py-2 text-sm text-left`}
                >
                  {option.name}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default SortMenu;
