import React, { useRef, useState } from 'react';
import type { AlbumListProps } from '../../../Interfaces/AlbumInterface';
import AlbumCard from '../AlbumCard/AlbumCard';
import PaginationControls from '../../shared/PaginationControls';
import { useScroll } from '../../../hooks/shared/useScroll';
import Spinner from '../../shared/Spinner';

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  onClick,
  page,
  totalPages,
  setPage,
  albumsLoading = false,
}) => {
  const listTopRef = useRef<HTMLDivElement>(null);
  const offset = window.innerWidth < 640 ? 140 : 200;
  const [shouldScroll, setShouldScroll] = useState(false);

  useScroll(shouldScroll ? listTopRef : null, {
    deps: [page],
    behavior: 'auto',
    offset,
    enabled: shouldScroll,
  });

  const handlePageChange = (newPage: number) => {
    setShouldScroll(true);
    setPage(newPage);
  };

  if (albumsLoading) {
    return (
      <div className='flex justify-center mt-10'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div ref={listTopRef} />

      <div className='flex justify-center'>
        <div className='flex flex-wrap justify-center gap-6 px-4 py-6 max-w-[1100px] w-full'>
          {albums.map((album) => (
            <div
              key={album.id}
              className='w-full max-w-[350px] sm:w-[calc((100%/2)-1.5rem)] lg:w-[calc((100%/3)-1.5rem)]'
            >
              <AlbumCard album={album} onClick={() => onClick?.(album.id)} />
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className='mt-8 w-full flex justify-center px-4'>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default AlbumList;
