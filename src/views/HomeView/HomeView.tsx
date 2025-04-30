import React from 'react';
import { Link } from 'react-router-dom';

const HomeView: React.FC = () => {
  return (
    <>
      {/* Sección principal */}
      <div className='flex flex-col items-center min-h-screen bg-[#E5E6E4] text-gray-900 p-6 pt-30'>
        <div className='flex flex-col-reverse lg:flex-row items-center w-full max-w-5xl text-center lg:text-left py-30'>
          <div className='lg:w-1/2 p-6'>
            <h1 className='text-8xl text-center font-extrabold tracking-wide font-annexxus'>
              TROVA
            </h1>
            <h2 className='text-2xl text-center tracking-wide'>
              Industrias Musicales S.A.
            </h2>
            <p className='text-xl text-gray-700 mt-8 leading-relaxed text-start pt-4'>
              Un sello independiente dedicado a la música latinoamericana.
              Trayectoria en el desarrollo de artistas y proyectos que marcaron
              la historia de la música.
            </p>
          </div>
          <img
            src='/src/assets/portada.png'
            alt='Portada de vinilo'
            className='w-[700px] h-[700px] object-cover rounded-full shadow-3xl opacity-100 filter contrast-90 saturate-60'
          />
        </div>
      </div>

      {/* Sección de la portada del vinilo */}
      <div className='flex flex-col items-center min-h-screen bg-[#E6E7D9] text-gray-900 px-6 py-20'>
        <div className='flex flex-col items-center w-full max-w-6xl mt-16 text-center lg:text-left'>
          <img
            src='/src/assets/turntable.gif'
            alt='Tocadiscos animado'
            className='h-[400px] filter opacity-100 contrast-70 rounded-full shadow-2xl'
          />
          <div className='lg:w-1/2 p-6 flex flex-col items-center text-center'>
            <p className='text-lg text-gray-800'>
              Descubre la variedad de artistas y álbumes que forman parte de
              nuestra colección.
            </p>
            <Link
              to='/catalogue'
              className='mt-8 px-6 py-3 bg-gray-900 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105 self-center inline-block text-center'
            >
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de plataformas digitales */}
      <div className='flex flex-col items-center bg-[#E5E6E4] text-gray-900 p-12 py-20'>
        <h2 className='text-3xl font-bold mb-4 text-center pt-10'>
          Escuchá nuestra música en plataformas digitales
        </h2>
        <p className='text-lg text-gray-700 text-center mb-8 max-w-xl'>
          Nuestro catálogo también está disponible en las principales
          plataformas de streaming. Reproducí nuestros discos donde quieras.
        </p>
        <div className='flex flex-wrap justify-center gap-12 items-center pt-10 pb-20'>
          <a
            href='https://open.spotify.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/src/assets/logos/spotify.png'
              alt='Spotify'
              className='h-12 hover:scale-110 transition-transform'
            />
          </a>
          <a
            href='https://music.youtube.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/src/assets/logos/youtube.png'
              alt='YouTube Music'
              className='h-12 hover:scale-110 transition-transform'
            />
          </a>
          <a
            href='https://music.amazon.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/src/assets/logos/amazon.png'
              alt='Amazon Music'
              className='h-12 hover:scale-110 transition-transform'
            />
          </a>
          <a
            href='https://music.apple.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/src/assets/logos/applemusic.png'
              alt='Apple Music'
              className='h-12 hover:scale-110 transition-transform'
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default HomeView;
