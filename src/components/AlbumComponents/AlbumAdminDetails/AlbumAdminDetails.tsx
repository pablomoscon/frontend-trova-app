import React, { useState } from 'react';
import Spinner from '../../shared/Spinner';
import { X } from 'lucide-react';
import { groupAlbumsByArtist } from '../../../utils/groupAlbumsByArtist';
import AlbumAdminDetailsGrid from './AlbumAdminDetailsGrid';
import { useFetchAlbums } from '../../../hooks/album/useFetchAlbum';

const AdminAlbumDetails: React.FC = () => {
  const { albums, isLoading, error } = useFetchAlbums();
  const [selectedAlbum, setSelectedAlbum] = useState<null | (typeof albums)[0]>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen text-xl text-gray-700'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen text-red-500 text-lg'>
        {error}
      </div>
    );
  }

  const groupedAlbums = groupAlbumsByArtist(albums);

  return (
    <div className='min-h-full p-8 pt-40 max-w-7xl mx-auto mb-10 content-center '>
      <h1 className='text-xl font-bold text-center mb-6'>Albums Overview</h1>

      {Object.entries(groupedAlbums).map(([artist, albums]) => (
        <section key={artist} className='mb-16'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center border-b pb-2'>
            {artist}
          </h2>

          <AlbumAdminDetailsGrid
            albums={albums}
            onOpenDetails={(album) => {
              setSelectedAlbum(album);
              setIsModalOpen(true);
            }}
            onOpenImage={(url) => setImageModalUrl(url)}
          />
        </section>
      ))}

      {isModalOpen && selectedAlbum && (
        <div
          className='fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center z-50'
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className='bg-white rounded-lg w-full md:w-2/3 lg:w-1/2 relative p-8 max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='absolute top-3 right-3 text-gray-500 hover:text-red-600'
              onClick={() => setIsModalOpen(false)}
            >
              <span className='sr-only'>Cerrar modal</span>
              <X size={20} />
            </button>

            <h3 className='text-2xl font-bold mb-2'>{selectedAlbum.title}</h3>
            <p className='text-gray-600 mb-4'>
              {selectedAlbum.details || 'No hay descripción disponible.'}
            </p>

            <div>
              <h4 className='font-semibold text-sm text-gray-800 mb-2'>
                Lista de Canciones:
              </h4>
              {selectedAlbum.listOfSongs.length > 0 ? (
                <ul className='pl-4 space-y-1 text-sm text-gray-700'>
                  {selectedAlbum.listOfSongs.map((song, idx) => (
                    <li key={idx}>
                      {idx + 1}. {song.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-gray-500 text-sm'>
                  No hay canciones registradas.
                </p>
              )}
              <div className='mt-4 flex flex-col gap-2 text-sm text-gray-700 justify-center'>
                <strong>Géneros:</strong>{' '}
                {selectedAlbum.genres.length > 0 ? (
                  <div className='inline-flex flex-wrap gap-2 mt-1 justify-center'>
                    {selectedAlbum.genres.map((genre, idx) => (
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
      )}

      {/* Modal de imagen */}
      {imageModalUrl && (
        <div
          className='fixed inset-0 backdrop-blur-lg bg-opacity-75 flex justify-center items-center z-50'
          onClick={() => setImageModalUrl(null)}
        >
          <button
            className='absolute top-10 right-10 text-gray-500 hover:text-red-600'
            onClick={() => setIsModalOpen(false)}
          >
            <span className='sr-only'>Cerrar modal</span>
            <X size={38} />
          </button>
          <img
            src={imageModalUrl}
            alt='Album full'
            className='max-w-full max-h-full rounded shadow-lg'
          />
        </div>
      )}
    </div>
  );
};

export default AdminAlbumDetails;
