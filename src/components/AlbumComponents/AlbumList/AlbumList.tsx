import React from 'react';
import type { AlbumListProps } from '../../../Interfaces/AlbumInterface';
import AlbumCard from '../AlbumCard/AlbumCard';
import { sortAlbums } from '../../../utils/sortAlbums';
import PaginationControls from '../../shared/PaginationControls';

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  onClick,
  page,
  totalPages,
  setPage,
}) => {
  const sortedAlbums = sortAlbums(albums);

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-wrap justify-center gap-6 max-w-[780px] w-full'>
          {sortedAlbums.map((album) => (
            <div
              key={album.id}
              className='w-[calc((100%-48px)/3)] max-w-[250px] flex-shrink-0'
            >
              <AlbumCard album={album} onClick={() => onClick?.(album)} />
            </div>
          ))}
        </div>
      </div>

      <div className='mt-8 w-full flex justify-center'>
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default AlbumList;
