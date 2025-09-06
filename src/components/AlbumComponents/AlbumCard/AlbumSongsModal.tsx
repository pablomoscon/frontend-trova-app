import React, { useRef } from 'react';
import { Loader } from 'lucide-react';
import { AlbumSongsModalProps } from '../../../Interfaces/AlbumInterface';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';
import AlbumPlatformLinks from '../../Shared/AlbumPlatformLinks';
import { useFetchAlbumSongs } from '../../../hooks/song/useFetchAlbumSongs';

const AlbumSongsModal: React.FC<AlbumSongsModalProps> = ({
  isOpen,
  album,
  onClose,
}) => {
  const albumId = album?.id; 
  const { songs, loading: songsLoading, error } = useFetchAlbumSongs(albumId);

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
            {!album || songsLoading ? 'Cargando' : album.title}
          </h3>
          <button
            onClick={onClose}
            className='text-sm text-gray-500 hover:text-gray-900 hover:scale-115 transition'
            aria-label='Cerrar modal'
          >
            ✕
          </button>
        </div>

        {/* Loader mientras no hay álbum */}
        {!album && (
          <div className='flex justify-center items-center h-40'>
            <Loader className='animate-spin text-gray-500 w-6 h-6' />
          </div>
        )}

        {album && (
          <>
            {/* Loader mientras cargan las canciones */}
            {songsLoading && (
              <div className='flex justify-center items-center h-40'>
                <Loader className='animate-spin text-gray-500 w-6 h-6' />
              </div>
            )}

            {/* Canciones cargadas */}
            {!songsLoading && songs.length > 0 && (
              <>
                <div className='text-start border-b pb-4 mb-4 mt-4'>
                  {(album.spotifyLink ||
                    album.amazonMusicLink ||
                    album.appleMusicLink) && (
                    <div className='flex flex-row items-center space-x-3 sm:space-x-2 gap-y-2 flex-col-xs items-start-xs'>
                      <p className='text-sm text-gray-500 flex-shrink-0 pr-1'>
                        🔊 ¡Encontralo en tu plataforma preferida!
                      </p>
                      <AlbumPlatformLinks
                        spotifyLink={album.spotifyLink}
                        amazonMusicLink={album.amazonMusicLink}
                        appleMusicLink={album.appleMusicLink}
                        variant='colored'
                        iconSize='text-lg sm:text-xl text-xl-xs'
                      />
                    </div>
                  )}
                </div>

                <ul role='list' className='divide-y divide-gray-100'>
                  {songs.map((song, index) => (
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

            {/* Caso sin canciones */}
            {!songsLoading && songs.length === 0 && !error && (
              <p className='text-gray-500 text-center mt-4'>
                Este álbum no contiene canciones.
              </p>
            )}

            {/* Error */}
            {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumSongsModal;
