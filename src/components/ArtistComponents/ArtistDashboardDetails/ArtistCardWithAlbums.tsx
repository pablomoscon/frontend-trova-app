import React from 'react';
import { ArtistObjectProps } from '../../../Interfaces/ArtistInterface';
import { useFetchAlbumsByArtist } from '../../../hooks/album/useFetchAlbumsByArtist';

const ArtistCardWithAlbums: React.FC<ArtistObjectProps> = ({ artist }) => {
  const { albums, loading } = useFetchAlbumsByArtist(artist.id || null);

  return (
    <div className='bg-white rounded-xl shadow-sm overflow-hidden flex flex-col items-center p-4 hover:shadow-md transition-shadow py-6'>
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
          <span className='font-bold'>{loading ? '...' : albums.length}</span>
          <span>Albums</span>
        </div>
        <div className='flex flex-col items-center flex-1'>
          <span className='font-bold'>
            {artist.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
          </span>
          <span>Estado</span>
        </div>
        <div className='flex flex-col items-center flex-1'>
          <span className='font-bold'>
            {new Date(artist.createdAt).toLocaleDateString()}
          </span>
          <span>Creado</span>
        </div>
      </div>
    </div>
  );
};

export default ArtistCardWithAlbums;
