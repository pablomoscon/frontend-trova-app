import React from 'react';
import CatalogueContent from '../../components/CatalogueComponents/CatalogueContent/CatalogueContent';

const CatalogueView: React.FC = () => {
  return (
    <div className='bg-[#E5E6E4] pt-15 sm:pt-20'>
      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-2'>
        <CatalogueContent />
      </main>
    </div>
  );
};

export default CatalogueView;
