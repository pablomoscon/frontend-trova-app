import React, { useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useAlbumsFetch } from '../../../hooks/album/useAlbumFetch';
import { useDeleteAlbum } from '../../../hooks/album/useDeleteAlbum';
import AlbumEditModal from '../AlbumEditModal/AlbumEditModal';

const AlbumManagementTable: React.FC = () => {
  const { albums, isLoading, error, reloadAlbums } = useAlbumsFetch();
  const { triggerDelete } = useDeleteAlbum(reloadAlbums);

  const [showModal, setShowModal] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (id: number) => {
    setSelectedAlbumId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlbumId(null);
    reloadAlbums();
  };

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className='min-h-screen bg-[#E5E6E4] flex-1'>
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 py-30'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Albums</h2>

        {/* Search Input */}
        <div className='w-full md:w-96 mb-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search Albums'
              className='w-full p-2 pr-10 rounded-md border border-gray-300 focus:outline-none'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='absolute top-2 right-2'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className='overflow-x-auto w-full'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Title
                </th>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Artist
                </th>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700 text-start'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAlbums.map((album) => (
                <tr key={album.id} className='border-b border-gray-300'>
                  <td className='px-4 py-2 text-sm text-gray-700'>
                    {album.title}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-700'>
                    {album.displayArtistName}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <div className='flex justify-start space-x-4'>
                      <button
                        onClick={() =>
                          album.id !== undefined && handleEdit(album.id)
                        }
                        className='text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md'
                        aria-label='Editar álbum'
                      >
                        <PencilIcon className='w-5 h-5 text-gray-800' />
                      </button>
                      <button
                        onClick={() =>
                          album.id !== undefined && triggerDelete(album.id)
                        }
                        className='text-sm text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md'
                        aria-label='Eliminar álbum'
                      >
                        <TrashIcon className='w-5 h-5 text-gray-600' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAlbums.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={3}
                    className='px-4 py-4 text-sm text-gray-500 text-center'
                  >
                    No albums found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedAlbumId !== null && (
        <AlbumEditModal albumId={selectedAlbumId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AlbumManagementTable;
