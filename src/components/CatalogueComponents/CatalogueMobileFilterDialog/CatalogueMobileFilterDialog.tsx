import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MobileFilterDialogProps } from '../../../Interfaces/CatalogueInterface';
import CatalogueFilterSidebar from '../CatalogueFilterSidebar/CatalogueFilterSidebar';

const CatalogueMobileFilterDialog: React.FC<MobileFilterDialogProps> = ({
  open,
  onClose,
  filters,
  selectedFilters,
  onFilterChange,
}) => (
  <Dialog open={open} onClose={onClose} className='relative z-40 lg:hidden'>
    <DialogBackdrop className='fixed inset-0 bg-black/25' />

    <div className='fixed inset-0 z-40 flex'>
      <DialogPanel className='ml-auto w-full max-w-sm transform bg-white shadow-xl transition-all flex flex-col relative'>
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 right-4 hover:text-black z-50 pt-30'
          aria-label='Cerrar filtros'
        >
          <XMarkIcon className='h-5 w-5 text-gray-600' aria-hidden='true' />
        </button>

        <div className='pt-14 px-6'>
          <h2 className='text-lg font-medium text-gray-900'>Filtros</h2>
        </div>

        <div className='mt-4 border-t border-gray-500 flex-grow overflow-y-auto px-4'>
          <CatalogueFilterSidebar
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
          />
        </div>

        <div className='mt-4 px-4 pb-4'>
          <button
            type='button'
            onClick={onClose}
            className='w-full rounded-md bg-gray-600 py-2 px-4 text-white hover:bg-gray-800 transition'
          >
            Aplicar filtros
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

export default CatalogueMobileFilterDialog;
