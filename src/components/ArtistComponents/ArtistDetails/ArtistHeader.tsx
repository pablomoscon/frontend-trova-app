import React from 'react';
import { ArtistObjectProps } from '../../../Interfaces/ArtistInterface';

const ArtistHeader: React.FC<ArtistObjectProps> = ({ artist }) => {
  return (
    <div className='px-6 pt-10 sm:px-8 sm:py-0 lg:px-0 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
      <div className='lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
        <div className='lg:mx-auto lg:flex lg:flex-col lg:items-center lg:text-center'>
          <div className='lg:max-w-lg'>
            <p className='text-base/7 font-semibold text-indigo-600'>
              Artista
            </p>
            <h1 className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl pb-6 lg:pb-0'>
              {artist.name}
            </h1>
            <div className='mt-6 block lg:hidden flex justify-center'>
              <img
                className='w-100 h-auto rounded-xl shadow-xl ring-1 ring-gray-400/10 object-cover'
                src={artist.photo}
                alt={`Photo of ${artist.name}`}
              />
            </div>
          </div>
          <div className='max-w-xl text-base/7 text-gray-700 lg:max-w-lg pt-10 text-pretty text-justify'>
            <p>{artist.details}</p>
          </div>
        </div>
        <div className='hidden lg:flex lg:justify-center pl-4'>
          <img
            className='min-w-[500px] w-auto h-auto max-h-[600px] mx-auto rounded-xl shadow-xl ring-2 ring-gray-400/10 object-cover im'
            src={artist.photo}
            alt={`Photo of ${artist.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
