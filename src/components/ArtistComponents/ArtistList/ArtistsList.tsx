import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../shared/Spinner';
import PaginationControls from '../../shared/PaginationControls';
import { useFetchArtists } from '../../../hooks/artist/useFetchArtists';
import { usePageAndSearch } from '../../../hooks/shared/usePageAndSearch';
import { useScroll } from '../../../hooks/shared/useScroll';

const ArtistList: React.FC = () => {
  const { page, setPage } = usePageAndSearch('artistPage');
  const pageSize = 8;

  const { artists, totalPages, isLoading, error } = useFetchArtists(
    page - 1,
    pageSize
  );

  const topRef = useRef<HTMLDivElement>(null);

  useScroll(topRef, {
    deps: [page, isLoading],
    behavior: 'instant',
    offset: 0,
    enabled: !isLoading,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );

  if (error) return <p className='text-center mt-20 text-red-500'>{error}</p>;

  return (
    <>
      <div ref={topRef} />
      <div className='bg-[#E5E6E4] min-h-screen py-50'>
        <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='sr-only'>Artists</h2>

          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-20'>
            {artists.length ? (
              artists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className='group text-center'
                >
                  <img
                    src={artist.photo}
                    alt={artist.name}
                    className='w-56 h-56 bg-gray-200 object-cover group-hover:opacity-75 rounded-full mx-auto'
                  />
                  <h3 className='mt-4 text-base text-gray-700'>
                    {artist.name}
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    {artist.nationality}
                  </p>
                </Link>
              ))
            ) : (
              <p className='text-center text-gray-500'>No artists found.</p>
            )}
          </div>

          {totalPages > 1 && (
            <PaginationControls
              page={page}
              totalPages={totalPages}
              setPage={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ArtistList;
