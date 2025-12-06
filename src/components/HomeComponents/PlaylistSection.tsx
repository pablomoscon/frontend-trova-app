import React from 'react';
import Section from '../Shared/Section';

const PlaylistSection: React.FC = () => {
  return (
    <Section
      title='Playlist del Mes'
      description='Disfrutá de una muestra representativa y destacada de canciones, que invita a descubrir la riqueza y diversidad de nuestra música.'
      bgColor='bg-[#E6E7D9]'
      textColor='text-gray-900'
    >
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
    </Section>
  );
};

export default PlaylistSection;

