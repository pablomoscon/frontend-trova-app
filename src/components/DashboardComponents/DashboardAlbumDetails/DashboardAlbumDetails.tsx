import React, { useState, useEffect } from 'react';
import Spinner from '../../shared/Spinner';
import PaginationControls from '../../shared/PaginationControls';
import { useFetchArtistsWithAlbums } from '../../../hooks/artist/useFetchArtistsWithAlbums';
import AlbumDetailsModal from './AlbumDetailsModal';
import ImageModal from './ImageModal';
import AlbumsByArtistSection from './AlbumsByArtistSection';
import { Album } from '../../../Interfaces/AlbumInterface';

const DashboardAlbumDetails: React.FC<{ pageSize?: number }> = ({
  pageSize = 3,
}) => {
  const [page, setPage] = useState(1);
  const { artists, totalPages, isLoading, error } = useFetchArtistsWithAlbums(
    page - 1,
    pageSize
  );

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAlbum(null);
    setImageModalUrl(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='pt-40 px-8 mb-20 min-h-screen max-w-7xl mx-auto flex flex-col items-center'>
      <h1 className='text-2xl font-bold text-center mb-6'>Álbums</h1>

      {artists.map((artist) => (
        <AlbumsByArtistSection
          key={artist.id}
          artist={artist}
          onAlbumSelect={(album) => setSelectedAlbum(album)}
          onImageOpen={setImageModalUrl}
        />
      ))}

      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onPageChangeComplete={() =>
            window.scrollTo({ top: 0, behavior: 'auto' })
          }
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
