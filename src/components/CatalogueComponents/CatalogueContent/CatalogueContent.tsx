import React, { useState } from 'react';
import Spinner from '../../shared/Spinner';
import AlbumList from '../../albumComponents/AlbumList/AlbumList';
import CatalogueFilterSidebar from '../CatalogueFilterSidebar/CatalogueFilterSidebar';
import CatalogueMobileFilterDialog from '../CatalogueMobileFilterDialog/CatalogueMobileFilterDialog';
import CatalogueHeader from '../CatalogueHeader/CatalogueHeader';
import { useFilteredAlbums } from '../../../hooks/album/useFilteredAlbums';
import AlbumSongsModal from '../../artistComponents/ArtistDetails/AlbumSongsModal';
import { Album } from '../../../Interfaces/AlbumInterface';
import { useFetchAlbums } from '../../../hooks/album/useFetchAlbum';

const CatalogueContent: React.FC = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState<number>(9);

  const {
    albums: allAlbums,
    isLoading,
    page,
    setPage,
    totalPages,
  } = useFetchAlbums(pageSize);

  const { albums, filters, selectedFilters, setSelectedFilters } =
    useFilteredAlbums(allAlbums, isLoading);

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
  };

  const openModal = (album: Album) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
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
      <CatalogueHeader onMobileFiltersOpen={() => setMobileFiltersOpen(true)} />

      <section aria-labelledby='albums-heading' className='pt-6 pb-24'>
        <h2 id='albums-heading' className='sr-only'>
          Albums
        </h2>

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
            />
          </div>
        </div>
      </section>

      {selectedAlbum && (
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
