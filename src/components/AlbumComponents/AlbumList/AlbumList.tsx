import React, { useRef, useState } from 'react';
import type { AlbumListProps } from '../../../Interfaces/AlbumInterface';
import AlbumCard from '../AlbumCard/AlbumCard';
import PaginationControls from '../../shared/PaginationControls';
import { useScroll } from '../../../hooks/shared/useScroll';

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  onClick,
  page,
  totalPages,
  setPage,
}) => {
const [isFirstLoad, setIsFirstLoad] = useState(true);
const listTopRef = useRef<HTMLDivElement>(null);
const offset = window.innerWidth < 640 ? 90 : 240;

 useScroll(isFirstLoad ? null : listTopRef, {
   deps: [page],
   behavior: 'smooth',
   offset,
 });

const handlePageChange = (newPage: number) => {
  setIsFirstLoad(false);
  setPage(newPage);
};

  return (
    <>
      <div ref={listTopRef} />

      <div className='flex justify-center'>
        <div
          className='grid auto-rows-auto grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6 justify-center px-4 py-6 max-w-[1100px]'>
          {albums.map((album) => (
            <div
              key={album.id}
              className='w-full max-w-[350px] md:max-w-[250px] mx-auto'>
              <AlbumCard album={album} onClick={() => onClick?.(album.id)} />
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className='mt-8 w-full flex justify-center'>
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
