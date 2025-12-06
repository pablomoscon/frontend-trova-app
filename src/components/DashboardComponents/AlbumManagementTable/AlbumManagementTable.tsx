import React from 'react';
import Spinner from '../../Shared/Spinner';
import SearchInput from '../../Shared/inputs/SearchInput';
import PageSizeSelector from '../../Shared/PageSizeSelector';
import PaginationControls from '../../Shared/PaginationControls';
import { useManagementAlbum } from '../../../hooks/album/useManagementAlbum';
import AlbumRow from './AlbumRow';
import AlbumEditModal from './AlbumEditModal';

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
  if (error)
    return (
      <p className='text-center text-red-500 mt-4 text-xs sm:text-sm md:text-base'>
        {error}
      </p>
    );

  return (
    <div
      ref={scrollRef}
      className='min-h-screen bg-[#E5E6E4] flex-1 overflow-y-auto'
    >
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 pt-30 pb-6'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center'>
          Álbumes
        </h2>

        <SearchInput
          placeholder='Buscar álbumes'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onEnter={onSearchKeyDown}
          className='w-full sm:w-80 mb-4 text-sm sm:text-sm md:text-base bg-gray-100'
        />

        <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />

        <div className='overflow-x-auto w-full pb-12'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200 text-center'>
              <tr>
                <th className='px-3 py-2 text-xs sm:text-sm md:text-base'>
                  Título
                </th>
                <th className='px-3 py-2 text-xs sm:text-sm md:text-base'>
                  Artista
                </th>
                <th className='px-3 py-2 text-xs sm:text-sm md:text-base'>
                  Estado
                </th>
                <th className='px-3 py-2 text-xs sm:text-sm md:text-base'>
                  Acciones
                </th>
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
                  <td
                    colSpan={4}
                    className='text-center py-4 text-gray-500 text-xs sm:text-sm md:text-base'
                  >
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
          />
        )}
      </div>
    </div>
  );
};

export default AlbumManagementTable;
