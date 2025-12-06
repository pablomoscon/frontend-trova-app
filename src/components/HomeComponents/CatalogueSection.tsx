import React, { useState } from 'react';
import ResponsiveImage from '../Shared/ResponsiveImage';
import Button from '../Shared/Button';

const CatalogueSection: React.FC = () => {
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);

  return (
    <section className='bg-[#E5E6E4] text-gray-900 px-6 sm:px-12 py-20 sm:py-30'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
        {/* Imagen Desktop */}
        <ResponsiveImage
          visibleOn='desktop'
          loaded={desktopLoaded}
          setLoaded={setDesktopLoaded}
          maxWidth='max-w-4xl lg:max-w-6xl'
        />

        {/* Texto */}
        <div className='flex flex-col gap-8 justify-start items-center md:items-start text-center md:text-left'>
          <h2 className='text-4xl sm:text-5xl font-extrabold leading-tight'>
            Explorá nuestra colección musical
          </h2>

          <p className='text-lg sm:text-xl text-gray-700 leading-relaxed text-justify max-w-xl md:max-w-md mx-auto'>
            Descubrí una selección única de artistas, géneros y álbumes que
            forman parte de nuestra identidad musical.
          </p>

          {/* Imagen Mobile */}
          <ResponsiveImage
            visibleOn='mobile'
            loaded={mobileLoaded}
            setLoaded={setMobileLoaded}
            maxWidth='max-w-md'
          />

          <div className='mt-4 flex justify-center w-full'>
            <Button to='/catalogo' text='Ver Catálogo' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogueSection;
