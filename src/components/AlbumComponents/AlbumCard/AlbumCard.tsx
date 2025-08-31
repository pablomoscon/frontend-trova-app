import React, { useState } from 'react';
import { AlbumCardProps } from '../../../Interfaces/AlbumInterface';
import AlbumPlatformLinks from '../../Shared/AlbumPlatformLinks';

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='w-full border border-gray-300 p-4 rounded shadow flex flex-col items-center justify-between min-h-[380px] sm:min-h-[400px]'>
      <div className='relative w-full h-auto max-h-[160px] sm:max-h-[200px] mb-2'>
        {/* Placeholder */}
        <img
          src='/assets/trova_logo_placeholder.webp'
          alt='Placeholder'
          className={`absolute inset-0 w-full h-full object-contain rounded transition-opacity duration-500 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Imagen real */}
        <img
          src={album.photo}
          alt={album.title}
          loading='lazy'
          className={`w-full h-full object-contain rounded hover:cursor-pointer transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          onClick={() => onClick?.(album.id)}
        />
      </div>

      <h3
        className='font-semibold text-md text-gray-600 hover:underline hover:cursor-pointer text-center transition w-full'
        onClick={() => onClick?.(album.id)}
      >
        {album.title}
      </h3>

      <p
        className='text-sm text-gray-500 text-center truncate w-full'
        title={album.displayArtistName}
      >
        {album.displayArtistName}
      </p>

      <p className='text-sm text-gray-500 text-center'>{album.year}</p>

      <AlbumPlatformLinks
        spotifyLink={album.spotifyLink}
        amazonMusicLink={album.amazonMusicLink}
        appleMusicLink={album.appleMusicLink}
      />
    </div>
  );
};

export default AlbumCard;
