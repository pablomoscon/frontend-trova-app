import React from 'react';
import { AlbumCardProps } from '../../../Interfaces/AlbumInterface';
import { FaSpotify, FaYoutube, FaAmazon, FaApple } from 'react-icons/fa';

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
    <div className='flex justify-center space-x-4 mt-2 text-lg sm:text-xl text-gray-600 pt-2'>
      <a href='' target='_blank' rel='noopener noreferrer' aria-label='Spotify'>
        <FaSpotify className='hover:text-green-500 transition' />
      </a>
      <a href='' target='_blank' rel='noopener noreferrer' aria-label='Youtube'>
        <FaYoutube className='hover:text-red-500 transition' />
      </a>
      <a
        href=''
        target='_blank'
        rel='noopener noreferrer'
        aria-label='AmazonMusic'
      >
        <FaAmazon className='hover:text-yellow-500 transition' />
      </a>
      <a
        href=''
        target='_blank'
        rel='noopener noreferrer'
        aria-label='AppleMusic'
      >
        <FaApple className='hover:text-gray-800 transition' />
      </a>
    </div>
  </div>
);

export default AlbumCard;
