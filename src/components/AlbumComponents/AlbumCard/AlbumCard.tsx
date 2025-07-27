import React from 'react';
import { AlbumCardProps } from '../../../Interfaces/AlbumInterface';
import AlbumPlatformLinks from '../../shared/AlbumPlatformLinks';

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => (
  <div className='w-full border border-gray-300 p-4 rounded shadow flex flex-col items-center justify-between min-h-[380px] sm:min-h-[400px]'>
    <img
      src={album.photo}
      alt={album.title}
      className='w-full h-auto max-h-[180px] sm:max-h-[220px] object-contain rounded mb-2'
    />
    <h3
      className='font-semibold text-md text-gray-600 hover:underline hover:cursor-pointer text-center transition'
      onClick={() => onClick?.(album.id)}
    >
      {album.title}
    </h3>
    <p className='text-sm text-gray-500 text-center'>
      {album.displayArtistName}
    </p>
    <p className='text-sm text-gray-500 text-center'>{album.year}</p>
    <AlbumPlatformLinks
      spotifyLink={album.spotifyLink}
      /* youtubeLink={album.youtubeLink} */
      amazonMusicLink={album.amazonMusicLink}
      appleMusicLink={album.appleMusicLink}
    />
  </div>
);

export default AlbumCard;
