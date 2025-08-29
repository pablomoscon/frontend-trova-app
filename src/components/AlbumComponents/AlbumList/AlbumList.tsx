import React, { useRef } from 'react';
import type { AlbumListProps } from '../../../Interfaces/AlbumInterface';
import PaginationControls from '../../Shared/PaginationControls';
import Spinner from '../../Shared/Spinner';
import AlbumCard from '../AlbumCard/AlbumCard';
import { useScroll } from '../../../hooks/shared/useScroll';

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  onClick,
  page,
  totalPages,
  setPage,
  albumsLoading = false,
}) => {
  const listTopRef = useRef<HTMLDivElement>(null);
  const offset = window.innerWidth < 640 ? 190 : 180;

  useScroll(listTopRef, { deps: [page], behavior: 'smooth', offset });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (albumsLoading) return <Spinner />;

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
