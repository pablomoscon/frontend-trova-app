import React from 'react';
import { AlbumAdminGridProps } from '../../../Interfaces/AlbumInterface';

const AlbumAdminDetailsGrid: React.FC<AlbumAdminGridProps> = ({
  albums,
  onOpenDetails,
  onOpenImage,
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 py-8'>
      {albums.map((album) => {
        const createdDate = album.createdAt ? new Date(album.createdAt) : null;

        return (
          <div
            key={album.id}
            className='bg-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col items-center p-4 hover:shadow-md transition-shadow py-6'
          >
            <div
              className='h-32 w-32 cursor-pointer overflow-hidden rounded-full mb-3'
              onClick={() => onOpenImage(album.photo)}
            >
              <img
                src={album.photo}
                alt={album.title}
                className='w-full h-full object-cover'
              />
            </div>

            <h3 className='text-lg font-semibold text-gray-800 mb-2 text-center'>
              {album.title}
            </h3>

            <div className='w-full text-xs text-gray-700 mt-auto space-y-1'>
              <p className='text-center'>
                <span className='font-semibold'>Año:</span> {album.year}
              </p>
              <p>
                <strong>Número de CD:</strong> {album.cdNumber}
              </p>
              <p>
                <strong>Estado:</strong>{' '}
                {album.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
              </p>
              <p>
                <strong>Creado:</strong>{' '}
                {createdDate
                  ? createdDate.toLocaleDateString('es-AR', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })
                  : 'Fecha no disponible'}
              </p>
            </div>

            <button
              aria-label='Ver detalles'
              onClick={() => onOpenDetails(album)}
              className='mt-4 text-indigo-600 hover:underline text-sm'
            >
              Ver más detalles
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumAdminDetailsGrid;
