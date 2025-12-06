import React from 'react';
import Spinner from '../../Shared/Spinner';
import { usePageAndSearch } from '../../../hooks/shared/usePageAndSearch';
import PaginationControls from '../../Shared/PaginationControls/PaginationControls';
import ArtistCardWithAlbums from './ArtistCardWithAlbums';
import { useFetchArtists } from '../../../hooks/artist/useFetchArtists';

const DashboardArtistDetails: React.FC = () => {
  const { page, setPage } = usePageAndSearch('artistPage');
  const pageSize = 6;
  const { artists, totalPages, isLoading, error } = useFetchArtists(
    page - 1,
    pageSize
  );

  if (isLoading) return <Spinner />;
  if (error) return <p className='text-red-500 text-center mt-4'>{error}</p>;

  return (
    <div className='min-h-full p-8 pt-40 content-center w-full'>
      <div className='w-full mb-8 bg-gray-100 p-6 shadow-md rounded-lg flex justify-center items-center text-gray-800'>
        <h1 className='text-2xl font-bold'>Artistas</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8'>
        {artists.map((artist) => (
          <ArtistCardWithAlbums key={artist.id} artist={artist} />
        ))}
      </div>

      <div className='content-center w-full py-10'>
        {totalPages > 1 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            onPageChangeComplete={() =>
              window.scrollTo({ top: 0, behavior: 'auto' })
            }
          />
        )}
      </div>
    </div>
  );
};

export default DashboardArtistDetails;
