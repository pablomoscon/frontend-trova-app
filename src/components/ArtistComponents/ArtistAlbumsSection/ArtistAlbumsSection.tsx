import { JSX } from 'react';
import AlbumList from '../../AlbumComponents/AlbumList/AlbumList';
import SortMenu from '../../Shared/SortMenu';
import { ArtistAlbumSectionProps } from '../../../Interfaces/ArtistInterface';

const ArtistAlbumsSection = <T extends string>(
  props: ArtistAlbumSectionProps<T>
): JSX.Element => {
  const {
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
    albumsLoading,
  } = props;

  return (
    <div className='mx-auto max-w-full sm:max-w-5xl px-4 sm:px-8 pb-35'>
      <div className='flex justify-end'>
        <div className='flex items-center'>
          <SortMenu<T>
            sortOptions={sortOptions}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
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
