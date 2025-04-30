import React from 'react';
import type { AlbumGridProps } from '../../../Interfaces/AlbumInterface';
import AlbumCard from '../AlbumCard/AlbumCard';
import { sortAlbums } from '../../../utils/sortAlbums';

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums, onClick }) => {
  const sortedAlbums = sortAlbums(albums);

  return (
    <div className='lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6'>
      {sortedAlbums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onClick={() => onClick?.(album)}
        />
      ))}
    </div>
  );
};

export default AlbumGrid;
