import React from 'react';
import { FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import SortMenu from '../CatalogueSortMenu/CatalogueSortMenu';
import { CatalogueHeaderProps } from '../../../Interfaces/CatalogueInterface';

const sortOptions = [
  { name: 'Más reciente', href: '#', current: true },
  { name: 'Más antiguo', href: '#', current: false }
];

const CatalogueHeader: React.FC<CatalogueHeaderProps> = ({
  onMobileFiltersOpen,
}) => (
  <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
    <h1 className='text-4xl font-bold tracking-tight text-gray-900'>Álbumes</h1>
    <div className='flex items-center'>
      <SortMenu sortOptions={sortOptions} />
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
);

export default CatalogueHeader;
