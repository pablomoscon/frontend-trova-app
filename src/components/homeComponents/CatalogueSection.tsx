import React from 'react';
import { Link } from 'react-router-dom';

const CatalogueSection: React.FC = () => (
  <div className='flex flex-col items-center bg-[#E6E7D9] text-gray-900 px-6 sm:px-10 py-20'>
    <div className='w-full max-w-6xl flex flex-col items-center gap-10 md:gap-12'>
      <img
        src='/src/assets/turntable.gif'
        alt='Tocadiscos animado'
        className='w-full max-w-md sm:max-w-lg md:max-w-xl object-contain rounded-full shadow-2xl'
      />
      <p className='text-xl sm:text-xlg md:text-xl max-w-3xl text-center text-gray-800'>
        Descubrí la variedad de artistas y álbumes que forman parte de nuestra
        colección.
      </p>
      <Link
        to='/catalogue'
        className='mt-2 px-6 py-3 bg-gray-900 text-white text-xl sm:text-lg md:text-xl font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105'
      >
        Explorar Catálogo
      </Link>
    </div>
  </div>
);

export default CatalogueSection;
