import React from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';
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
    <div className='border-b border-neutral-200 px-4 sm:px-6 pt-30'>
      <h2 className='text-center text-3xl sm:text-4xl  font-semibold tracking-tight text-neutral-800'>
        Conocé nuestra colección
      </h2>
      <p className='mt-2 sm:mt-3 text-center text-sm sm:text-base text-neutral-500 max-w-xl mx-auto'>
        Encontrá discos por fecha de publicación, accedé a plataformas digitales
        y disfrutá de la música.
      </p>

      <div className='mt-8 flex justify-end'>
        <div className='flex items-center space-x-4'>
          <SortMenu
            sortOptions={sortOptions}
            selectedSort={sortOrder}
            setSelectedSort={setSortOrder}
          />
          <button
            type='button'
            onClick={onMobileFiltersOpen}
            className='p-2 text-neutral-400 hover:text-neutral-600 transition-colors lg:hidden'
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
