import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchResults } from '../../../hooks/shared/useSearchResults';
import { SearchAlbumsResultsProps } from '../../../Interfaces/AlbumInterface';
import { useScroll } from '../../../hooks/shared/useScroll';
import Spinner from '../../shared/Spinner';
import AlbumCard from '../AlbumCard/AlbumCard';
import PaginationControls from '../../shared/PaginationControls';

const SearchAlbumsResults: React.FC<SearchAlbumsResultsProps> = ({
  initialQuery = '',
  pageSize = 9,
  onAlbumClick,
}) => {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('query') ?? '';
  const query = initialQuery || queryFromUrl;

  const { albums, isLoading, error, totalPages, page, setPage } =
    useSearchResults(query, pageSize);

  const listTopRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const offset = window.innerWidth < 640 ? 90 : 240;

  useScroll(shouldScroll ? listTopRef : null, {
    deps: [page],
    behavior: 'auto',
    offset,
    enabled: shouldScroll,
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setShouldScroll(true);
      setPage(newPage);
    }
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className='bg-[#E5E6E4] min-h-screen w-full'>{children}</div>
  );

  if (isLoading)
    return (
      <Wrapper>
        <div className='py-12'>
          <Spinner />
        </div>
      </Wrapper>
    );

  if (error)
    return (
      <Wrapper>
        <div className='py-12 text-center text-red-500'>Error: {error}</div>
      </Wrapper>
    );

  if (!albums || albums.length === 0)
    return (
      <Wrapper>
        <div className='py-12 text-center text-gray-600'>
          No se encontraron álbumes.
        </div>
      </Wrapper>
    );

  return (
    <Wrapper>
      <div ref={listTopRef} />

      <div className='flex justify-center'>
        <div className='grid auto-rows-auto grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6 justify-center px-4 py-6 max-w-[1100px]'>
          {albums.map((album) => (
            <div
              key={album.id}
              className='w-full max-w-[350px] md:max-w-[250px] mx-auto '
            >
              <AlbumCard
                album={album}
                onClick={() => onAlbumClick?.(album.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className='pt-8 pb-16 w-full flex justify-center'>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={handlePageChange}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default SearchAlbumsResults;
