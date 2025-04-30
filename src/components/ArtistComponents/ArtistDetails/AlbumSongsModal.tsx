import React, { useEffect } from 'react';
import { AlbumSongsModalProps } from '../../../Interfaces/AlbumInterface';
import { FaAmazon, FaApple, FaSpotify, FaYoutube } from 'react-icons/fa';

const AlbumSongsModal: React.FC<AlbumSongsModalProps> = ({
  isOpen,
  album,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !album || !album.listOfSongs) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30'>
      <div className='bg-white p-6 rounded-xl w-11/12 sm:w-[500px] shadow-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center '>
          <h3 className='text-2xl font-bold text-gray-900'>{album.title}</h3>

          <button
            onClick={onClose}
            className='text-sm text-gray-500 hover:text-gray-900 hover:scale-115 transition'
          >
            ✕
          </button>
        </div>

        <div className='text-start border-b pb-4 mb-4 mt-2 flex space-x-4 mt-2 text-gray-600 pt-2 text-xl'>
          <p className='text-sm text-gray-500'>
            🔊 ¡Encontralo en tu plataforma preferida!
          </p>

          <a href='' target='_blank' rel='noopener noreferrer'>
            <FaSpotify className='text-green-500 transition hover:scale-125' />
          </a>

          <a href='' target='_blank' rel='noopener noreferrer'>
            <FaYoutube className='text-red-500 transition hover:scale-125 ' />
          </a>

          <a href='' target='_blank' rel='noopener noreferrer'>
            <FaAmazon className='text-blue-800 transition hover:scale-125 ' />
          </a>

          <a href='' target='_blank' rel='noopener noreferrer'>
            <FaApple className='text-gray-700 transition hover:scale-125' />
          </a>
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
                {song.name && (
                  <p className='mt-1 text-xs text-gray-500'>
                    {song.artistName}
                  </p>
                )}
              </div>
              <div className='shrink-0 flex items-center'>
                <p className='text-sm text-gray-600'>{song.duration}</p>
              </div>
            </li>
          ))}
        </ul>

        <button
          className='mt-6 w-full bg-gray-600 hover:bg-grey-700 text-white py-2 px-4 rounded-lg transition duration-150'
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AlbumSongsModal;
