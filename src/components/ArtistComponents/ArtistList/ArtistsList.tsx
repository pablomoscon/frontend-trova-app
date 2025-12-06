import React, { useRef } from 'react';
import Spinner from '../../Shared/Spinner';
import PaginationControls from '../../Shared/PaginationControls/PaginationControls';
import { useFetchArtists } from '../../../hooks/artist/useFetchArtists';
import { usePageAndSearch } from '../../../hooks/shared/usePageAndSearch';
import { useScroll } from '../../../hooks/shared/useScroll';
import ArtistCard from './ArtistCard';

const ArtistList: React.FC = () => {
  const { page, setPage } = usePageAndSearch('artistPage');
  const pageSize = 8;

  const { artists, totalPages, isLoading, error } = useFetchArtists(
    page - 1,
    pageSize,
    'ACTIVE'
  );

  const topRef = useRef<HTMLDivElement>(null);

  useScroll(topRef as React.RefObject<HTMLElement>, {
    deps: [page, isLoading],
    behavior: 'instant',
    offset: 0,
    enabled: !isLoading,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <Spinner />;

  if (error) return <p className='text-center mt-20 text-red-500'>{error}</p>;

  return (
    <>
      <div ref={topRef} />
      <section className='bg-[#E5E6E4] min-h-screen pt-40 py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10'>
            {artists.length ? (
              artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))
            ) : (
              <p className='text-center text-gray-500 col-span-full'>
                No se encontraron artistas.
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className='mt-12'>
              <PaginationControls
                page={page}
                totalPages={totalPages}
                setPage={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ArtistList;
