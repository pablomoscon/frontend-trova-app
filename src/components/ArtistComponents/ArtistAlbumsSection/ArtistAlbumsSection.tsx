import React from 'react';
import AlbumList from '../../albumComponents/AlbumList/AlbumList';
import { ArtistAlbumSectionProps } from '../../../Interfaces/ArtistInterface';

const ArtistAlbumsSection: React.FC<ArtistAlbumSectionProps> = ({
  artistName,
  albums,
  onAlbumClick,
  page,
  totalPages,
  setPage,
  pageSize,
  setPageSize,
}) => (
  <div className='mx-auto max-w-5xl px-8 py-16'>
    <h2 className='text-2xl font-bold tracking-tight text-gray-900 py-10'>
      Álbumes de {artistName}
    </h2>
    <AlbumList
      albums={albums}
      onClick={onAlbumClick}
      page={page}
      totalPages={totalPages}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  </div>
);

export default ArtistAlbumsSection;
