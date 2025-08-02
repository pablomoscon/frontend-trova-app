import React, { useState } from 'react';
import { ArtistObjectProps } from '../../../Interfaces/ArtistInterface';
import { useFetchAlbumsByArtist } from '../../../hooks/album/useFetchAlbumsByArtist';
import ArtistDetailsModal from './ArtistDetailsModal';

const ArtistCardWithAlbums: React.FC<ArtistObjectProps> = ({ artist }) => {
  const { albums, loading } = useFetchAlbumsByArtist(artist.id || null, 1);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='bg-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col items-center p-4 hover:shadow-md transition-shadow py-6'>
        <img
          src={artist.photo}
          alt={artist.name}
          loading='lazy'
          className='w-30 h-30 object-cover rounded-full mb-3'
        />
        <h2 className='text-lg font-semibold text-gray-800 mb-2'>
          {artist.name}
        </h2>
        <p className='text-gray-500 mb-2'>{artist.nationality}</p>
        <div className='w-full text-xs text-gray-600 mb-3 flex justify-between items-end'>
          <p className='line-clamp-2 max-w-[calc(100%-10px)] text-justify'>
            {artist.details}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className='text-gray-600 font-bold text-sm cursor-pointer hover:text-gray-800'
            title='Ver más'
          >
            +
          </button>
        </div>

        <div className='flex justify-between w-full text-xs text-gray-700 mt-auto'>
          <div className='flex flex-col items-center flex-1'>
            <span>Álbums</span>
            <span className='font-bold'>{loading ? '...' : albums.length}</span>
          </div>
          <div className='flex flex-col items-center flex-1'>
            <span>Estado</span>
            <span className='font-bold'>
              {artist.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
            </span>
          </div>
          <div className='flex flex-col items-center flex-1'>
            <span>Creado</span>
            <span className='font-bold'>
              {new Date(artist.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {showModal && (
        <ArtistDetailsModal
          artist={artist}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ArtistCardWithAlbums;
