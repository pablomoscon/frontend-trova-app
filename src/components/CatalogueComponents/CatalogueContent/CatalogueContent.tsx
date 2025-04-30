
import React, { useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import AlbumGrid from '../../AlbumComponents/AlbumsGrid/AlbumGrid';
import CatalogueFilterSidebar from '../CatalogueFilterSidebar/CatalogueFilterSidebar';
import CatalogueMobileFilterDialog from '../CatalogueMobileFilterDialog/CatalogueMobileFilterDialog';
import CatalogueHeader from '../CatalogueHeader/CatalogueHeader';
import { useFilteredAlbums } from '../../../hooks/album/useFilteredAlbums';

const CatalogueContent: React.FC = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { albums, filters, selectedFilters, setSelectedFilters, loading } =
    useFilteredAlbums();

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
  };

  if (loading) {
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
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
          <div className='hidden lg:block'>
            <CatalogueFilterSidebar
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className='lg:col-span-3'>
            <AlbumGrid albums={albums ?? []} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CatalogueContent;
