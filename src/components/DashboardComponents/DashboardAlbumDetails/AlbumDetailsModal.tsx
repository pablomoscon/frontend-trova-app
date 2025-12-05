import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { AlbumDetailsModalProps } from '../../../Interfaces/DashboardInterface';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';
import { useFetchAlbumSongs } from '../../../hooks/song/useFetchAlbumSongs';
import Spinner from '../../Shared/Spinner';

const AlbumDetailsModal: React.FC<AlbumDetailsModalProps> = ({
  album,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useCloseOnOutside(modalRef, onClose);

  const { songs, loading, error } = useFetchAlbumSongs(album.id);

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

        <h3 className='text-xl font-bold my-2 pb-2'>{album.title}</h3>
        <p className='text-gray-600 mb-4 text-sm py-4 border-t-1'>
          {album.details || 'No hay descripción disponible.'}
        </p>

        <div>
          <h4 className='font-semibold text-sm text-gray-800 mb-2'>
            Lista de canciones:
          </h4>

          {loading && (
            <div className='flex justify-center py-4'>
              <Spinner />
            </div>
          )}

          {error && <p className='text-red-600 text-sm'>Error: {error}</p>}

          {!loading && !error && songs.length > 0 ? (
            <ul className='pl-4 space-y-1 text-sm text-gray-700'>
              {songs.map((song, idx) => (
                <li key={song.id || idx}>
                  {idx + 1}. {song.name} — {song.duration}
                </li>
              ))}
            </ul>
          ) : (
            !loading &&
            !error && (
              <p className='text-gray-500 text-sm'>
                No hay canciones registradas.
              </p>
            )
          )}

          <div className='mt-4 flex flex-col gap-2 text-sm text-gray-700 justify-center'>
            <strong>Géneros:</strong>{' '}
            {album.genres.length > 0 ? (
              <div className='inline-flex flex-wrap gap-2 mt-1 justify-center'>
                {album.genres.map((genre) => (
                  <span
                    key={genre}
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

          <div className='mt-4 flex flex-col gap-2 text-sm text-gray-700 justify-center'>
            <strong>Enlaces a plataformas:</strong>{' '}
            {album.amazonMusicLink ||
            album.spotifyLink ||
            album.appleMusicLink ? (
              <div className='inline-flex flex-wrap gap-2 mt-1 justify-center'>
                {album.amazonMusicLink && (
                  <a
                    href={album.amazonMusicLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full hover:underline'
                  >
                    Amazon Music
                  </a>
                )}
                {album.spotifyLink && (
                  <a
                    href={album.spotifyLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full hover:underline'
                  >
                    Spotify
                  </a>
                )}
                {album.appleMusicLink && (
                  <a
                    href={album.appleMusicLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full hover:underline'
                  >
                    Apple Music
                  </a>
                )}
              </div>
            ) : (
              'No hay enlaces disponibles'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailsModal;
