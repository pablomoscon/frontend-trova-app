import React, { useState } from 'react';
import Spinner from '../../Shared/Spinner';
import AlbumList from '../../AlbumComponents/AlbumList/AlbumList';
import { useFilteredAlbums } from '../../../hooks/album/useFilteredAlbums';
import AlbumSongsModal from '../../AlbumComponents/AlbumCard/AlbumSongsModal';
import { useFetchAlbumById } from '../../../hooks/album/useFetchAlbumById';
import { usePageAndSearch } from '../../../hooks/shared/usePageAndSearch';
import CatalogueMobileFilterDialog from '../CatalogueMobileFilterDialog/CatalogueMobileFilterDialog';
import CatalogueHeader from '../CatalogueHeader/CatalogueHeader';
import CatalogueFilterSidebar from '../CatalogueFilterSidebar/CatalogueFilterSidebar';

const CatalogueContent: React.FC = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { page, setPage } = usePageAndSearch('cataloguePage');

  const {
    albums,
    filters,
    selectedFilters,
    setSelectedFilters,
    isLoading,
    totalPages,
    pageSize,
    setPageSize,
    sortOrder,
    setSortOrder,
  } = useFilteredAlbums(9, page, setPage);

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
        setSortOrder={(newSort) => {
          setSortOrder(newSort);
          setPage(1);
        }}
      />

      <section
        aria-labelledby='albums-heading'
        className='pt-4 pb-24 min-h-screen bg-[#E5E6E4]'
      >
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-5 px-4'>
          {/* Sidebar filters */}
          <div className='hidden lg:block lg:col-span-1'>
            <CatalogueFilterSidebar
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Album list */}
          <div className='lg:col-span-4'>
            {isLoading ? (
              <Spinner />
            ) : (
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
            )}
          </div>
        </div>
      </section>

      {selectedAlbum && isModalOpen && !isAlbumLoading && (
        <AlbumSongsModal
          isOpen={isModalOpen}
          album={selectedAlbum}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default CatalogueContent;
