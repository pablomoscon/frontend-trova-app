import React from 'react';
import { Link } from 'react-router-dom';

const CatalogueSection: React.FC = () => (
  <section className='bg-[#E5E6E4] text-gray-900 px-6 sm:px-12 py-20 sm:py-30'>
    <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
      <div className='order-2 md:order-1 w-full flex justify-center hidden md:flex'>
        <img
          src='/assets/catalogo_trova.png'
          alt='Colección Trova'
          className='rounded-3xl shadow-xl object-cover transition-transform duration-700 w-full h-auto max-w-4xl lg:max-w-6xl'
        />
      </div>
      <div className='flex flex-col gap-8 justify-start items-center md:items-start text-center md:text-left order-1'>
        <h2 className='mt-0 text-4xl md:text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-center'>
          Explorá nuestra colección musical
        </h2>

        <p className='text-lg md:text-lg sm:text-xl text-gray-700 leading-relaxed text-justify max-w-xl md:max-w-md mx-auto'>
          Descubrí una selección única de artistas, géneros y álbumes que forman
          parte de nuestra identidad musical.
        </p>

        <div className='w-full flex justify-center md:hidden py-6'>
          <img
            src='/assets/catalogo_trova.png'
            alt='Colección Trova'
            className='rounded-3xl shadow-xl object-cover transition-transform duration-700 w-full h-auto max-w-md'
          />
        </div>

        <div className='mt-4 flex justify-center w-full'>
          <Link
            to='/catalogo'
            className='block w-full sm:w-full bg-gray-900 text-white text-lg sm:text-xl font-medium px-6 py-4 rounded-full shadow-md hover:bg-gray-800 transition-transform transform hover:scale-105 duration-300 text-center max-w-sm'
          >
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CatalogueSection;
