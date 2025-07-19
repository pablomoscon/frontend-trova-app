import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../../utils/classNamesUtils';
import { SortMenuProps } from '../../../Interfaces/CatalogueInterface';

const CatalogueSortMenu: React.FC<SortMenuProps> = ({ sortOptions }) => (
  <Menu as='div' className='relative inline-block text-left'>
    <MenuButton className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
      Ordenar
      <ChevronDownIcon className='ml-1 size-5 text-gray-400 group-hover:text-gray-500' />
    </MenuButton>
    <MenuItems className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
      <div className='py-1'>
        {sortOptions.map((option) => (
          <MenuItem key={option.name}>
            <a
              href={option.href}
              className={classNames(
                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                'block px-4 py-2 text-sm hover:bg-gray-400'
              )}
            >
              {option.name}
            </a>
          </MenuItem>
        ))}
      </div>
    </MenuItems>
  </Menu>
);

export default CatalogueSortMenu;
