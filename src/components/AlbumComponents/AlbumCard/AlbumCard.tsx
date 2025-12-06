import React, { useState } from 'react';
import { AlbumCardProps } from '../../../Interfaces/AlbumInterface';
import AlbumPlatformLinks from '../../Shared/AlbumPlatformLinks';

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className='
        w-full border border-gray-300 p-4 rounded shadow 
        flex flex-col items-center justify-between
        min-h-[380px] sm:min-h-[400px]
      '
    >
      {/* IMAGEN */}
      <div className='relative w-full pt-4'>
        <img
          src='/assets/trova_logo_placeholder.webp'
          alt='Placeholder'
          className={`
            absolute inset-0 w-full h-auto max-h-[180px] sm:max-h-[200px]
            object-contain rounded mb-2 transition-opacity duration-500
            filter brightness-90
            ${loaded ? 'opacity-0' : 'opacity-100'}
          `}
        />

        <img
          src={album.photo}
          alt={album.title}
          loading='lazy'
          onLoad={() => setLoaded(true)}
          className={`
            w-full h-auto max-h-[180px] sm:max-h-[200px]
            object-contain rounded mb-2 transition-opacity duration-500
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>

      {/* TÍTULO */}
      <button
        onClick={() => onClick?.(album.id)}
        className='font-semibold text-md text-gray-600 hover:underline text-center w-full'
      >
        {album.title}
      </button>

      {/* ARTISTA */}
      <p
        className='text-sm text-gray-500 text-center truncate w-full'
        title={album.displayArtistName}
      >
        {album.displayArtistName}
      </p>

      {/* AÑO */}
      <p className='text-sm text-gray-500 text-center'>{album.year}</p>

      {/* LINKS */}
      <AlbumPlatformLinks
        spotifyLink={album.spotifyLink}
        amazonMusicLink={album.amazonMusicLink}
        appleMusicLink={album.appleMusicLink}
      />
    </div>
  );
};

export default AlbumCard;
