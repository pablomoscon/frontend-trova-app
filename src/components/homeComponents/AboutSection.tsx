import React from 'react';

const AboutSection: React.FC = () => (
  <section className='bg-[#E6E7D9] text-gray-900 px-6 sm:px-12 py-32'>
    <div className='max-w-4xl mx-auto flex flex-col gap-12 items-center text-center'>
      <div className='flex items-center gap-6 justify-center w-full'>
        <img
          src='/src/assets/trova_logo_2.png'
          alt='Trova Logo'
          className='max-w-12 max-h-12 object-contain rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg'
        />
        <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight'>
          Sobre Nosotros
        </h2>
      </div>

      <p className='text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl'>
        En{' '}
        <span className='font-semibold text-gray-900'>
          Trova Industrias Musicales
        </span>
        , celebramos la riqueza de la música popular iberoamericana. Nuestro
        objetivo es preservar, difundir y dar nueva vida a una tradición sonora
        que forma parte de nuestra identidad cultural. Reunimos artistas
        consagrados y emergentes, curando catálogos que combinan historia,
        pasión y compromiso.
      </p>
      <p className='text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl'>
        Ya sea que busques redescubrir joyas del pasado o conectar con
        propuestas actuales, este espacio está diseñado para vos. Bienvenido al
        universo Trova.
      </p>
    </div>
  </section>
);

export default AboutSection;
