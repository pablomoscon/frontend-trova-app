import React, { useState } from 'react';
import { useAlbumsFetch } from '../../../hooks/album/useAlbumFetch';
import Spinner from '../../Spinner/Spinner';
import { Plus, X } from 'lucide-react';

const formatGenre = (genre: string) =>
  genre
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const AdminAlbumDetails: React.FC = () => {
  const { albums, isLoading, error } = useAlbumsFetch();
  const [selectedAlbum, setSelectedAlbum] = useState<null | (typeof albums)[0]>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
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

  return (
    <div className='py-40 px-6 max-w-7xl mx-auto'>
      <h1 className='text-4xl font-bold text-gray-900 mb-22 text-center tracking-tight'>
        🎵 Album Dashboard
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 '>
        {albums.map((album) => {
          return (
            <div
              key={album.id}
              className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer mb-10'
            >
              {/* Imagen con borde inferior */}
              <div
                className='w-full h-36 border-b border-gray-200 overflow-hidden'
                onClick={() => setImageModalUrl(album.photo)}
              >
                <img
                  src={album.photo}
                  alt={album.title}
                  className='w-full h-full object-cover transition-transform duration-200 hover:scale-105'
                />
              </div>

              <div className='flex flex-col divide-y divide-gray-300/40'>
                {/* Título y artista con toggle */}
                <div className='px-4 py-3 flex flex-col items-center relative'>
                  <h2 className='text-base font-semibold text-gray-900'>
                    {album.title}
                  </h2>
                  <p className='text-xs text-gray-500'>
                    {album.displayArtistName ||
                      album.artistName ||
                      'Unknown Artist'}
                  </p>
                  <button
                    aria-label='Add to playlist'
                    className='absolute top-2 right-3 text-xl text-gray-400 font-bold select-none'
                    onClick={() => {
                      setSelectedAlbum(album);
                      setIsModalOpen(true);
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de detalles */}
      {isModalOpen && selectedAlbum && (
        <div
          className='fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center z-50'
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className='bg-white rounded-lg w-full md:w-1/2 relative py-20'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='absolute top-3 right-3 text-gray-500 hover:text-red-600'
              onClick={() => setIsModalOpen(false)}
            >
              <span className='sr-only'>Cerrar modal</span>
              <X size={20} />
            </button>
            <h2 className='text-2xl font-bold mb-2'>{selectedAlbum.title}</h2>
            <p>
              <strong>Artist:</strong>{' '}
              {selectedAlbum.displayArtistName || selectedAlbum.artistName}
            </p>
            <h3 className='mt-4 text-lg font-semibold'>Details</h3>
            <p>
              <strong>Year:</strong> {selectedAlbum.year}
            </p>
            <p>
              <strong>CD #:</strong> {selectedAlbum.cdNumber}
            </p>
            <p>
              <strong>Created:</strong>{' '}
              {new Date(selectedAlbum.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Tracks:</strong> {selectedAlbum.listOfSongs.length}
            </p>
            <div className='mt-2'>
              <strong>Genres:</strong>
              <div className='flex flex-wrap gap-1 mt-1 justify-center'>
                {selectedAlbum.genres.length > 0 ? (
                  selectedAlbum.genres.map((genre) => (
                    <span
                      key={genre}
                      className='bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-[10px] font-medium'
                    >
                      {formatGenre(genre)}
                    </span>
                  ))
                ) : (
                  <span className='text-gray-400'>No genres</span>
                )}
              </div>
            </div>
            <div className='mt-2 flex flex-column justify-center pt-4'>
              <button
                className='text-indigo-600 text-xs cursor-pointer  flex'
                onClick={() => setIsDescriptionModalOpen(true)}
              >
                View Description <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de descripción */}
      {isDescriptionModalOpen && selectedAlbum && (
        <div
          className='fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center z-50'
          onClick={() => setIsDescriptionModalOpen(false)}
        >
          <div
            className='bg-white rounded-lg w-full md:w-1/2 relative py-50'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='absolute top-3 right-3 text-gray-500 hover:text-red-600'
              onClick={() => setIsDescriptionModalOpen(false)}
            >
              <span className='sr-only'>Cerrar modal</span>
              <X size={20} />
            </button>
            <h3 className='text-xl font-bold'>Description</h3>
            <p>
              {selectedAlbum.details ||
                'No description available for this album.'}
            </p>
          </div>
        </div>
      )}

      {/* Modal de imagen */}
      {imageModalUrl && (
        <div
          className='fixed inset-0 backdrop-blur-lg bg-opacity-75 flex justify-center items-center z-50'
          onClick={() => setImageModalUrl(null)}
        >
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
