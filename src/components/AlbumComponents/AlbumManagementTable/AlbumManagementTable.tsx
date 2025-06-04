import React from 'react';
import Spinner from '../../shared/Spinner';
import SearchInput from '../../shared/SearchInput';
import AlbumEditModal from '../AlbumEditModal/AlbumEditModal';
import AlbumRow from './AlbumRow';
import { useManagementAlbum } from '../../../hooks/album/useManagementAlbum';

const AlbumManagementTable: React.FC = () => {
  const {
    filteredAlbums,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedAlbumId,
    showModal,
    toggleStatus,
    triggerDelete,
    handleEdit,
    handleCloseModal,
  } = useManagementAlbum();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className='min-h-screen bg-[#E5E6E4] flex-1'>
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 py-30'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Albums</h2>

        <SearchInput
          placeholder='Buscar Albums'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className='overflow-x-auto w-full'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr className='text-center'>
                <th className='px-4 py-2'>Título</th>
                <th className='px-4 py-2'>Artista</th>
                <th className='px-4 py-2'>Estado</th>
                <th className='px-4 py-2'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlbums.length > 0 ? (
                filteredAlbums.map((album) => (
                  <AlbumRow
                    key={album.id}
                    album={album}
                    onEdit={handleEdit}
                    onDelete={triggerDelete}
                    onToggleStatus={toggleStatus}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className='text-center py-4 text-gray-500'>
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
