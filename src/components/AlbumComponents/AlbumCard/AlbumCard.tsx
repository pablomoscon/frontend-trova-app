import React from 'react';
import { AlbumCardProps } from '../../../Interfaces/AlbumInterface';
import { FaSpotify, FaYoutube, FaAmazon, FaApple } from 'react-icons/fa';

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => (
  <div className='border border-gray-300 p-4 rounded shadow'>
    {' '}
    <img src={album.photo} alt={album.title} className='w-full h-auto mb-2' />
    <h3
      className='font-semibold text-lg text-gray-600 hover:underline hover:cursor-pointer transition'
      onClick={onClick}
    >
      {album.title}
    </h3>
    <p className='text-sm text-gray-500'>{album.displayArtistName}</p>
    <p className='text-sm text-gray-500'>{album.year}</p>
    <div className='flex justify-center space-x-4 mt-2 text-xl text-gray-600 pt-2'>
    
        <a href="" target='_blank' rel='noopener noreferrer'>
          <FaSpotify className='hover:text-green-500 transition' />
        </a>
    
        <a href="" target='_blank' rel='noopener noreferrer'>
          <FaYoutube className='hover:text-red-500 transition' />
        </a>
    
        <a href="" target='_blank' rel='noopener noreferrer'>
          <FaAmazon className='hover:text-yellow-500 transition' />
        </a>
      
        <a href="" target='_blank' rel='noopener noreferrer'>
          <FaApple className='hover:text-gray-800 transition' />
        </a>
    
    </div>
  </div>
);

export default AlbumCard;