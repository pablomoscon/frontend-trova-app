import React from 'react';
import Spinner from '../../shared/Spinner';
import SearchInput from '../../shared/SearchInput';
import ArtistRow from './ArtistRow';
import ArtistEditModal from '../ArtistEditModal/ArtistEditModal';
import { useManagementArtist } from '../../../hooks/artist/useManagementArtists';

const ArtistManagementTable: React.FC = () => {
  const {
    filteredArtists,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    toggleStatus,
    triggerDelete,
    handleEdit,
    handleCloseModal,
    selectedArtistId,
    showModal,
  } = useManagementArtist();

  if (isLoading) return <Spinner />;
  if (error) return <p className='text-red-500 text-center mt-4'>{error}</p>;

  return (
    <div className='min-h-screen bg-[#E5E6E4] flex-1'>
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 py-8'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Artists</h2>

        <SearchInput
          placeholder='Buscar Artistas'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className='overflow-x-auto w-full'>
          <table className='min-w-full table-auto text-center border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='px-4 py-2'>Nombre</th>
                <th className='px-4 py-2'>País</th>
                <th className='px-4 py-2'>Estado</th>
                <th className='px-4 py-2'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtists.length > 0 ? (
                filteredArtists.map((artist) => (
                  <ArtistRow
                    key={artist.id}
                    artist={artist}
                    onDelete={triggerDelete}
                    onToggleStatus={toggleStatus}
                    onEdit={handleEdit}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className='text-center py-4 text-gray-500'>
                    No artists found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && selectedArtistId != null && (
          <ArtistEditModal
            artistId={selectedArtistId}
            onClose={handleCloseModal}
            onSaveSuccess={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistManagementTable;
