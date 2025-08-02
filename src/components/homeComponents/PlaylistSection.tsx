import React from 'react';

const PlaylistSection: React.FC = () => {
  return (
    <section className='bg-[#E6E7D9] text-gray-900 px-6 sm:px-12 py-20 sm:py-30'>
      <div className='max-w-4xl mx-auto flex flex-col gap-12 items-center text-center'>
        <h2 className='text-4xl font-extrabold'>Playlist del Mes</h2>
        <p className='text-lg sm:text-xl text-gray-700 max-w-xl'>
          Disfrutá de una muestra representativa y destacada de canciones, que
          invita a descubrir la riqueza y diversidad de nuestra música.
        </p>

        {/* Spotify Embed */}
        <div className='w-full max-w-lg rounded-xl overflow-hidden shadow-lg'>
          <iframe
            src='https://open.spotify.com/embed/playlist/22kU2NHI4smZRYuf3nCxGX?utm_source=generator'
            width='100%'
            height='380'
            frameBorder='0'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            title='Playlist Curada del Mes'
          ></iframe>
        </div>

        {/* Buttons */}
        <div className='flex gap-6'>
          <a
            href='/downloads/playlist-curada.mp3'
            download
            className='bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transition'
          >
            Descargar Playlist
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlaylistSection;
