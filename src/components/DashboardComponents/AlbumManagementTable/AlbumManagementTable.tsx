import React from 'react';
import Spinner from '../../shared/Spinner';
import SearchInput from '../../shared/SearchInput';
import AlbumRow from './AlbumRow';
import AlbumEditModal from './AlbumEditModal';
import PageSizeSelector from '../../shared/PageSizeSelector';
import PaginationControls from '../../shared/PaginationControls';
import { useManagementAlbum } from '../../../hooks/album/useManagementAlbum';

const AlbumManagementTable: React.FC = () => {
  const {
    albums,
    isLoading,
    error,
    searching,
    page,
    setPage,
    totalPages,
    pageSize,
    setPageSize,
    searchTerm,
    onSearchChange,
    onSearchKeyDown,
    toggleStatus,
    handleDelete,
    showModal,
    selectedAlbumId,
    handleEdit,
    handleCloseModal,
    scrollRef,
  } = useManagementAlbum();

  if (isLoading) return <Spinner />;
  if (error) return <p className='text-center text-red-500 mt-4'>{error}</p>;

  return (
    <div
      ref={scrollRef}
      className='min-h-screen bg-[#E5E6E4] flex-1 overflow-y-auto'
    >
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 pt-30 pb-6'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Álbumes</h2>

        <SearchInput
          placeholder='Buscar álbumes'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onEnter={onSearchKeyDown}
        />

        <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />

        <div className='overflow-x-auto w-full pb-12'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200 text-center'>
              <tr>
                <th className='px-4 py-2'>Título</th>
                <th className='px-4 py-2'>Artista</th>
                <th className='px-4 py-2'>Estado</th>
                <th className='px-4 py-2'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {albums.length ? (
                albums.map((al) => (
                  <AlbumRow
                    key={al.id}
                    album={al}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={toggleStatus}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className='text-center py-4 text-gray-500'>
                    {searching
                      ? 'No se encontraron álbumes para esa búsqueda.'
                      : 'No hay álbumes cargados.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}

        {showModal && selectedAlbumId !== null && (
          <AlbumEditModal
            albumId={selectedAlbumId}
            onClose={handleCloseModal}
            /* onSaveSuccess={reload} */
          />
        )}
      </div>
    </div>
  );
};

export default AlbumManagementTable;
