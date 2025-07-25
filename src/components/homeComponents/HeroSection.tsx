import React from 'react';

const HeroSection: React.FC = () => (
  <div className='flex flex-col items-center min-h-screen bg-[#E5E6E4] text-gray-900 px-10 pt-50 sm:pt-50 pb-30 sm:pb-30'>
    <div className='flex flex-col-reverse lg:flex-row items-center w-full max-w-6xl'>
      <div className='lg:w-1/3 w-full max-w-[75%] sm:max-w-[70%] mx-auto mt-10 lg:mt-0'>
        <h1 className='text-8xl sm:text-9xl text-center lg:text-left font-extrabold tracking-wide font-annexxus'>
          TROVA
        </h1>
        <h2 className='text-2xl sm:text-2xl mt-2 text-center lg:text-center tracking-wide'>
          Industrias Musicales S.A.
        </h2>
        <p className='text-lg sm:text-lg md:text-xl text-gray-700 mt-6 leading-relaxed text-justify'>
          Un sello independiente dedicado a la música latinoamericana.
          Trayectoria en el desarrollo de artistas y proyectos que marcaron la
          historia de la música.
        </p>
      </div>
      <div className='lg:w-1/2 w-full flex justify-center'>
        <img
          src='/src/assets/portada.png'
          alt='Portada de vinilo'
          className='w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[660px] xl:max-w-[740px] object-contain rounded-full opacity-80 contrast-105 saturate-100 shadow-xl spin-slow mx-auto'
        />
      </div>
    </div>
  </div>
);

export default HeroSection;
