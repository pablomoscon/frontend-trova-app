import React, { useState } from 'react';
import Spinner from '../../Shared/Spinner';
import PaginationControls from '../../Shared/PaginationControls';
import { useFetchArtistsWithAlbums } from '../../../hooks/artist/useFetchArtistsWithAlbums';
import { Album } from '../../../Interfaces/AlbumInterface';
import { usePageAndSearch } from '../../../hooks/shared/usePageAndSearch';
import { useScroll } from '../../../hooks/shared/useScroll';
import { useResetStatesOnPageChange } from '../../../hooks/shared/useResetStatesOnPageChange';
import AlbumsByArtistSection from './AlbumsByArtistSection';
import AlbumDetailsModal from './AlbumDetailsModal';
import ImageModal from './ImageModal';

const DashboardAlbumDetails: React.FC<{ pageSize?: number }> = ({
  pageSize = 3,
}) => {
  const { page, setPage } = usePageAndSearch('dashboardAlbumPage');
  const { artists, totalPages, isLoading, error } = useFetchArtistsWithAlbums(
    page - 1,
    pageSize
  );
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null);

  useScroll(null, {
    deps: [page, isLoading],
    behavior: 'auto',
    enabled: !isLoading,
    offset: 0,
  });

  useResetStatesOnPageChange(page, [
    () => setSelectedAlbum(null),
    () => setImageModalUrl(null),
  ]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='pt-40 mb-20 min-h-screen max-w-7xl mx-auto flex flex-col items-center'>
      <div className='w-2xl mb-8 bg-gray-100 p-6 shadow-md rounded-lg flex justify-center items-center text-gray-600'>
        <h1 className='text-2xl font-bold'>Álbumes</h1>
      </div>

      {artists.map((artist) => (
        <AlbumsByArtistSection
          key={artist.id}
          artist={artist}
          onAlbumSelect={setSelectedAlbum}
          onImageOpen={setImageModalUrl}
        />
      ))}

      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onPageChangeComplete={() => {}}
        />
      )}

      {selectedAlbum && (
        <AlbumDetailsModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}

      {imageModalUrl && (
        <ImageModal
          imageUrl={imageModalUrl}
          onClose={() => setImageModalUrl(null)}
        />
      )}
    </div>
  );
};

const ErrorMessage = ({ message }: { message: string }) => (
  <div className='flex justify-center items-center h-screen text-red-500 text-lg'>
    {message}
  </div>
);

export default DashboardAlbumDetails;
