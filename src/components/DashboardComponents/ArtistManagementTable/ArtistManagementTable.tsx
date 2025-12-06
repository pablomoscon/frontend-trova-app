import React from 'react';
import Spinner from '../../Shared/Spinner';
import SearchInput from '../../Shared/inputs/SearchInput';
import PageSizeSelector from '../../Shared/PageSizeSelector';
import PaginationControls from '../../Shared/PaginationControls/PaginationControls';
import { useManagementArtists } from '../../../hooks/artist/useManagementArtists';
import ArtistRow from './ArtistRow';
import ArtistEditModal from './ArtistEditModal';

const ArtistManagementTable: React.FC = () => {
  const {
    artists,
    totalPages,
    isLoading,
    searching,
    error,
    toggleStatus,
    triggerDelete,
    showModal,
    selectedArtistId,
    openEditModal,
    closeEditModal,
    reload,
    scrollRef,
    page,
    setPageSize,
    setPage,
    pageSize,
    searchTerm,
    onSearchChange,
    onSearchKeyDown,
  } = useManagementArtists();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className='text-red-500 text-center mt-4 text-xs sm:text-sm md:text-base'>
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
          Artistas
        </h2>

        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4'>
          <SearchInput
            placeholder='Buscar artistas'
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onEnter={onSearchKeyDown}
            className='w-full sm:w-80 mb-4 text-sm sm:text-sm md:text-base bg-gray-100'
          />

          <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />
        </div>

        <div className='overflow-x-auto w-full pb-12'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200 text-center'>
              <tr>
                <th className='px-3 py-2 text-xs sm:text-sm md:text-base'>
                  Nombre
                </th>
                <th className='px-3 py-2 text-xs sm:text-sm md:text-base'>
                  País
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
              {artists.length ? (
                artists.map((a) => (
                  <ArtistRow
                    key={a.id}
                    artist={a}
                    onDelete={triggerDelete}
                    onToggleStatus={toggleStatus}
                    onEdit={openEditModal}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className='text-center py-4 text-gray-500 text-xs sm:text-sm md:text-base'
                  >
                    {searching
                      ? 'No se encontraron artistas para esa búsqueda.'
                      : 'No hay artistas cargados.'}
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

        {showModal && selectedArtistId !== null && (
          <ArtistEditModal
            artistId={selectedArtistId}
            onClose={closeEditModal}
            onSaveSuccess={reload}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistManagementTable;
