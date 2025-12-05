import React from 'react';
import { AlbumDetailsListProps } from '../../../Interfaces/DashboardInterface';

const AlbumDetailsList: React.FC<AlbumDetailsListProps> = ({
  albums,
  onOpenDetails,
  onOpenImage,
}) => {
  return (
    <div className='w-full flex justify-center'>
      <div className='flex flex-wrap justify-center gap-5 sm:gap-6 pt-6 max-w-screen-lg'>
        {albums.map((album) => {
          const createdDate = album.createdAt
            ? new Date(album.createdAt)
            : null;

          return (
            <div
              key={album.id}
              className='w-60 sm:w-64 md:w-72 bg-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col items-center p-4 hover:shadow-md transition-shadow'
            >
              <button
                className='h-28 w-28 cursor-pointer overflow-hidden rounded-full mb-3'
                onClick={() => onOpenImage(album.photo)}
              >
                <img
                  src={album.photo}
                  alt={album.title}
                  loading='lazy'
                  className='w-full h-full object-cover'
                />
              </button>

              <h3 className='text-lg font-semibold text-gray-800 mb-2 text-center'>
                {album.title}
              </h3>

              <div className='w-full text-xs text-gray-700 mt-auto space-y-[2px]'>
                <p className='text-center'>
                  <span className='font-semibold'>Año:</span> {album.year}
                </p>
                <p>
                  <strong>Nº CD:</strong> {album.cdNumber}
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
                    : '—'}
                </p>
              </div>

              <button
                aria-label='Ver detalles'
                onClick={() => onOpenDetails(album)}
                className='mt-3 text-indigo-600 hover:underline text-sm'
              >
                Ver más detalles
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumDetailsList;
