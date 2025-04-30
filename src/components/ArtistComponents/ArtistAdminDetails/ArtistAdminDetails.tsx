import React from 'react';
import Spinner from '../../Spinner/Spinner';
import { useArtistFetch } from '../../../hooks/artist/useArtistFetch';

const ArtistDashboardDetails: React.FC = () => {
  const { artists, loading, error } = useArtistFetch(true);

  if (loading) return <Spinner />;
  if (error) return <p className='text-red-500 text-center mt-4'>{error}</p>;

  return (
    <div className='min-h-full p-8 pt-40'>
      <h1 className='text-xl font-bold text-center mb-6'>Artists Overview</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8'>
        {artists.map((artist) => (
          <div
            key={artist.id}
            className='bg-white rounded-xl shadow-sm overflow-hidden flex flex-col items-center p-4 hover:shadow-md transition-shadow py-6'
          >
            <img
              src={artist.photo}
              alt={artist.name}
              className='w-24 h-24 object-cover rounded-full mb-3'
            />
            <h2 className='text-lg font-semibold text-gray-800 mb-2'>
              {artist.name}
            </h2>
            <p className='text-gray-500 mb-2'>{artist.nationality}</p>
            <p className='text-gray-600 text-xs text-center mb-3 line-clamp-3'>
              {artist.details}
            </p>

            <div className='flex justify-between w-full text-xs text-gray-700 mt-auto'>
              <div className='flex flex-col items-center flex-1'>
                <span className='font-bold'>
                  {artist.albums ? artist.albums.length : 0}{' '}
                  {/* Seguridad al leer albums */}
                </span>
                <span>Albums</span>
              </div>
              <div className='flex flex-col items-center flex-1'>
                <span className='font-bold'>
                  {new Date(artist.createdAt).toLocaleDateString()}
                </span>
                <span>Created</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistDashboardDetails;
