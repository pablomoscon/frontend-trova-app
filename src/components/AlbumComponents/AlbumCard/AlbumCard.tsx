import React from 'react';
import { AlbumCardProps } from '../../../Interfaces/AlbumInterface';
import AlbumPlatformLinks from '../../Shared/AlbumPlatformLinks';
import { LazyImage } from '../../Shared/LazyImage';

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => (
  <div className='w-full border border-gray-300 p-4 rounded shadow flex flex-col items-center justify-between min-h-[380px] sm:min-h-[400px]'>
    <LazyImage
      src={album.photo}
      alt={album.title}
      placeholderSrc='/assets/trova_logo_placeholder.webp'
      objectFit='contain'
      containerClassName='w-full h-auto max-h-[200px] mb-2'
      onClick={() => onClick?.(album.id)}
    />

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

export default AlbumCard;
