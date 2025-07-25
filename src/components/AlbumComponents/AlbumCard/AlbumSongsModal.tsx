import React, { useRef } from 'react';
import { FaAmazon, FaApple, FaSpotify, FaYoutube } from 'react-icons/fa';
import { Loader } from 'lucide-react';
import { useFetchAlbumById } from '../../../hooks/album/useFetchAlbumById';
import { AlbumSongsModalProps } from '../../../Interfaces/AlbumInterface';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';

const AlbumSongsModal: React.FC<AlbumSongsModalProps> = ({
  isOpen,
  albumId,
  onClose,
}) => {
  const { album, isLoading } = useFetchAlbumById(albumId);

  const panelRef = useRef<HTMLDivElement>(null);
  useCloseOnOutside(panelRef, onClose);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30'>
      <div
        ref={panelRef}
        className='bg-white p-6 rounded-xl w-11/12 sm:w-[500px] shadow-2xl max-h-[90vh] overflow-y-auto'
      >
        <div className='flex justify-between items-center'>
          <h3 className='text-2xl font-bold text-gray-900'>
            {isLoading ? 'Cargando...' : album?.name || 'Álbum'}
          </h3>
          <button
            onClick={onClose}
            className='text-sm text-gray-500 hover:text-gray-900 hover:scale-115 transition'
            aria-label='Cerrar modal'
          >
            ✕
          </button>
        </div>

        {isLoading && (
          <div className='flex justify-center items-center h-40'>
            <Loader className='animate-spin text-gray-500 w-6 h-6' />
          </div>
        )}

        {!isLoading && album?.listOfSongs && (
          <>
            <div className='text-start border-b pb-4 mb-4 mt-4 flex space-x-4 text-gray-600 pt-2 text-xl items-center'>
              <p className='text-sm text-gray-500'>
                🔊 ¡Encontralo en tu plataforma preferida!
              </p>
              <FaSpotify className='text-green-500 transition hover:scale-125 cursor-pointer' />
              <FaYoutube className='text-red-500 transition hover:scale-125 cursor-pointer' />
              <FaAmazon className='text-blue-800 transition hover:scale-125 cursor-pointer' />
              <FaApple className='text-gray-700 transition hover:scale-125 cursor-pointer' />
            </div>

            <ul role='list' className='divide-y divide-gray-100'>
              {album.listOfSongs.map((song, index) => (
                <li
                  key={song.id || index}
                  className='flex justify-between gap-x-4 py-4'
                >
                  <div className='flex min-w-0 flex-col text-start'>
                    <p className='text-sm font-semibold text-gray-900'>
                      {song.name}
                    </p>
                    <p className='mt-1 text-xs text-gray-500'>
                      {song.artistName}
                    </p>
                  </div>
                  <div className='shrink-0 flex items-center'>
                    <p className='text-sm text-gray-600'>{song.duration}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              className='mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-150'
              onClick={onClose}
            >
              Cerrar
            </button>
          </>
        )}

        {!isLoading && !album?.listOfSongs && (
          <p className='text-gray-500 text-center mt-4'>
            Este álbum no contiene canciones.
          </p>
        )}
      </div>
    </div>
  );
};

export default AlbumSongsModal;
