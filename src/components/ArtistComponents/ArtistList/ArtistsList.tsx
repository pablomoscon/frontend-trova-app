import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../Shared/Spinner';
import PaginationControls from '../../Shared/PaginationControls';
import { useFetchArtists } from '../../../hooks/artist/useFetchArtists';
import { usePageAndSearch } from '../../../hooks/shared/usePageAndSearch';
import { useScroll } from '../../../hooks/shared/useScroll';

const ArtistList: React.FC = () => {
  const { page, setPage } = usePageAndSearch('artistPage');
  const pageSize = 8;

  const { artists, totalPages, isLoading, error } = useFetchArtists(
    page - 1,
    pageSize,
    'ACTIVE'
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

  if (isLoading) return <Spinner />;

  if (error) return <p className='text-center mt-20 text-red-500'>{error}</p>;

  return (
    <>
      <div ref={topRef} />
      <section className=' bg-[#E5E6E4] min-h-screen pt-40 py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10'>
            {artists.length ? (
              artists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artistas/${artist.id}`}
                  className='group flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300'
                >
                  <div className='relative w-48 h-48 rounded-full overflow-hidden shadow-lg border border-gray-200'>
                    <img
                      src={artist.photo}
                      alt={artist.name}
                      loading='lazy'
                      className='object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300'
                    />
                  </div>
                  <h3 className='mt-4 text-lg font-medium text-gray-800 group-hover:text-black transition-colors duration-200'>
                    {artist.name}
                  </h3>
                  <span className='text-sm text-gray-500'>
                    {artist.nationality}
                  </span>
                </Link>
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
