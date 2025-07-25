import React from 'react';
import { FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { CatalogueHeaderProps } from '../../../Interfaces/CatalogueInterface';
import SortMenu from '../../shared/SortMenu';

const sortOptions = [
  { name: 'Más reciente', value: 'desc' },
  { name: 'Más antiguo', value: 'asc' },
];

const CatalogueHeader: React.FC<CatalogueHeaderProps> = ({
  onMobileFiltersOpen,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className='border-b border-gray-200 pt-14 px-4 sm:px-6'>
      <h1 className='text-3xl sm:text-5xl font-bold text-gray-700 text-center mt-10'>
        Catálogo de discos
      </h1>

      <div className='pt-12 flex justify-end'>
        <div className='flex items-center'>
          <SortMenu
            sortOptions={sortOptions}
            selectedSort={sortOrder}
            setSelectedSort={setSortOrder}
          />
          <button
            type='button'
            className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500'
            aria-label='Cambiar vista de cuadrícula'
          >
            <Squares2X2Icon className='h-5 w-5' />
          </button>
          <button
            type='button'
            onClick={onMobileFiltersOpen}
            className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden'
            aria-label='Abrir filtros'
          >
            <FunnelIcon className='h-5 w-5' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogueHeader;
