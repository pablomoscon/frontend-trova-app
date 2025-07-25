import React, { useState } from 'react';
import Spinner from '../../shared/Spinner';
import AlbumList from '../../albumComponents/AlbumList/AlbumList';
import CatalogueFilterSidebar from '../CatalogueFilterSidebar/CatalogueFilterSidebar';
import CatalogueMobileFilterDialog from '../CatalogueMobileFilterDialog/CatalogueMobileFilterDialog';
import CatalogueHeader from '../CatalogueHeader/CatalogueHeader';
import { useFilteredAlbums } from '../../../hooks/album/useFilteredAlbums';
import AlbumSongsModal from '../../albumComponents/AlbumCard/AlbumSongsModal';
import { useFetchAlbumById } from '../../../hooks/album/useFetchAlbumById';

const CatalogueContent: React.FC = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    albums,
    filters,
    selectedFilters,
    setSelectedFilters,
    isLoading,
    page,
    setPage,
    totalPages,
    pageSize,
    setPageSize,
    sortOrder,
    setSortOrder,
  } = useFilteredAlbums();

  const { album: selectedAlbum, isLoading: isAlbumLoading } =
    useFetchAlbumById(selectedAlbumId);

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    setPage(1);
  };

  const openModal = (albumId: number) => {
    setSelectedAlbumId(albumId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbumId(null);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-[#E6E7D9]'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <CatalogueMobileFilterDialog
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <CatalogueHeader
        onMobileFiltersOpen={() => setMobileFiltersOpen(true)}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <section
        aria-labelledby='albums-heading'
        className='pt-4 pb-24 min-h-screen bg-[#E5E6E4] '
      >
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 px-4'>
          <div className='hidden lg:block'>
            <CatalogueFilterSidebar
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className='lg:col-span-3'>
            <AlbumList
              albums={albums ?? []}
              onClick={openModal}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              albumsLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {selectedAlbum && isModalOpen && !isAlbumLoading && (
        <AlbumSongsModal
          isOpen={isModalOpen}
          albumId={selectedAlbum.id}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default CatalogueContent;
