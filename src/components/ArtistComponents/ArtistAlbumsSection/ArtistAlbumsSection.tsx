import React from 'react';
import AlbumList from '../../albumComponents/AlbumList/AlbumList';
import SortMenu from '../../shared/SortMenu';
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
  sortOptions,
  selectedSort,
  setSelectedSort,
  albumsLoading
}) => {
  const handleSetSortOrder = (value: '' | 'asc' | 'desc') => {
    if (value === 'asc' || value === 'desc') {
      setSelectedSort(value);
    }
  };

  return (
    <div className='mx-auto max-w-full sm:max-w-5xl px-4 sm:px-8 pt-25 pb-35'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900 py-10 text-center sm:text-left'>
        Álbumes de {artistName}
      </h2>

      <div className='pt-6 flex justify-end '>
        <div className='flex items-center '>
          <SortMenu
            sortOptions={sortOptions}
            selectedSort={selectedSort}
            setSelectedSort={handleSetSortOrder}
          />
        </div>
      </div>
      <AlbumList
        albums={albums}
        onClick={onAlbumClick}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        albumsLoading={albumsLoading}
      />
    </div>
  );
};

export default ArtistAlbumsSection;
