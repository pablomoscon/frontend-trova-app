import React, { useState } from 'react';
import ArtistHeader from './ArtistHeader';
import ArtistAlbumsSection from '../ArtistAlbumsSection/ArtistAlbumsSection';
import AlbumSongsModal from '../../albumComponents/AlbumCard/AlbumSongsModal';
import Spinner from '../../shared/Spinner';
import { useDetailsArtist } from '../../../hooks/artist/useDetailsArtist';
import { useFetchAlbumsByArtist } from '../../../hooks/album/useFetchAlbumsByArtist';
import { Album } from '../../../Interfaces/AlbumInterface';
import { usePageAndSearch } from '../../../hooks/shared/usePageAndSearch';

const sortOptions = [
  { name: 'Más reciente', value: 'desc' },
  { name: 'Más antiguo', value: 'asc' },
];

const ArtistDetailsContent: React.FC<{ artistId: number }> = ({ artistId }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const {
    artist,
    loading: artistLoading,
    error: artistError,
  } = useDetailsArtist(artistId);

  const { page, setPage } = usePageAndSearch(`artistDetailsPage_${artistId}`);

  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
    totalPages,
    pageSize,
    setPageSize
  } = useFetchAlbumsByArtist(artistId, page, sortOrder);

  if (artistLoading || albumsLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );

  if (artistError || albumsError)
    return (
      <p className='text-center mt-20 text-red-500'>
        {artistError || albumsError}
      </p>
    );

  if (!artist) return null;

  const openModal = (albumId: number) => {
    const album = albums.find((a) => a.id === albumId);
    if (album) {
      setSelectedAlbum(album);
      setIsModalOpen(true);
    }
  };

  return (
    <div className='bg-[#E5E6E4] px-6 pt-50 lg:px-0'>
      <ArtistHeader artist={artist} />

      <ArtistAlbumsSection
        artistName={artist.name}
        albums={albums}
        onAlbumClick={openModal}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortOptions={sortOptions}
        selectedSort={sortOrder}
        setSelectedSort={setSortOrder}
        albumsLoading={albumsLoading}
      />

      {selectedAlbum && (
        <AlbumSongsModal
          isOpen={isModalOpen}
          albumId={selectedAlbum.id}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAlbum(null);
          }}
        />
      )}
    </div>
  );
};

export default ArtistDetailsContent;
