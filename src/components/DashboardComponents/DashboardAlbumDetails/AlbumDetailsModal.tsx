import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { AlbumDetailsModalProps } from '../../../Interfaces/DashboardInterface';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';


const AlbumDetailsModal: React.FC<AlbumDetailsModalProps> = ({
  album,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useCloseOnOutside(modalRef, onClose);

  return (
    <div className='fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center z-50'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg w-full md:w-2/3 lg:w-1/2 relative p-8 max-h-[90vh] overflow-y-auto'
      >
        <button
          className='absolute top-3 right-3 text-gray-500 hover:text-red-600'
          onClick={onClose}
        >
          <span className='sr-only'>Cerrar modal</span>
          <X size={20} />
        </button>

        <h3 className='text-2xl font-bold mb-2'>{album.title}</h3>
        <p className='text-gray-600 mb-4'>
          {album.details || 'No hay descripción disponible.'}
        </p>

        <div>
          <h4 className='font-semibold text-sm text-gray-800 mb-2'>
            Lista de canciones:
          </h4>
          {album.listOfSongs?.length ? (
            <ul className='pl-4 space-y-1 text-sm text-gray-700'>
              {album.listOfSongs.map((song, idx) => {
                console.log('Song:', song);
                return (
                  <li key={idx}>
                    {idx + 1}. {song.title} — {song.duration}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className='text-gray-500 text-sm'>
              No hay canciones registradas.
            </p>
          )}

          <div className='mt-4 flex flex-col gap-2 text-sm text-gray-700 justify-center'>
            <strong>Géneros:</strong>{' '}
            {album.genres.length > 0 ? (
              <div className='inline-flex flex-wrap gap-2 mt-1 justify-center'>
                {album.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className='bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full'
                  >
                    {genre
                      .replace(/_/g, ' ')
                      .toLowerCase()
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                ))}
              </div>
            ) : (
              'No especificados'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailsModal;
