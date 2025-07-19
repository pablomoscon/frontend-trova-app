import React from 'react';

const PlatformsSection: React.FC = () => (
  <div className='flex flex-col items-center bg-[#E5E6E4] text-gray-900 py-20 px-4'>
    <h2 className='text-3xl sm:text-3xl md:text-4xl font-bold text-center mb-6'>
      Escuchá nuestra música en plataformas digitales
    </h2>
    <p className='text-xl sm:text-xlg md:text-xl text-gray-700 text-center max-w-3xl mb-12'>
      Nuestro catálogo también está disponible en las principales plataformas de
      streaming.
    </p>
    <div className='py-4 sm:py-4 md:py-2 lg:py-8 xl:py-10'>
      <div className='flex flex-wrap justify-center gap-8 items-center'>
        {[
          {
            name: 'Spotify',
            src: '/src/assets/logos/spotify.png',
            href: 'https://open.spotify.com/',
          },
          {
            name: 'YouTube Music',
            src: '/src/assets/logos/youtube.png',
            href: 'https://music.youtube.com/',
          },
          {
            name: 'Amazon Music',
            src: '/src/assets/logos/amazon.png',
            href: 'https://music.amazon.com/',
          },
          {
            name: 'Apple Music',
            src: '/src/assets/logos/applemusic.png',
            href: 'https://music.apple.com/',
          },
        ].map(({ name, src, href }) => (
          <a key={name} href={href} target='_blank' rel='noopener noreferrer'>
            <img
              src={src}
              alt={name}
              className='h-10 sm:h-10 md:h-12 lg:h-12 hover:scale-110 transition-transform'
            />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default PlatformsSection;
