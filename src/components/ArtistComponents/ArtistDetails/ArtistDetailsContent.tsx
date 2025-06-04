import React, { useState } from 'react';
import ArtistHeader from './ArtistHeader';
import ArtistAlbumsSection from '../ArtistAlbumsSection/ArtistAlbumsSection';
import AlbumSongsModal from './AlbumSongsModal';
import { ArtistProps } from '../../../Interfaces/ArtistInterface';
import { Album } from '../../../Interfaces/AlbumInterface';
import Spinner from '../../shared/Spinner';
import { useDetailsArtist } from '../../../hooks/artist/useDetailsArtist';
import { useFetchAlbumsByArtist } from '../../../hooks/album/useFetchAlbumsByArtist';

const ArtistDetailsContent: React.FC<ArtistProps> = ({ artistId }) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    artist,
    loading: artistLoading,
    error: artistError,
  } = useDetailsArtist(artistId);

  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
    totalPages,
  } = useFetchAlbumsByArtist(artistId, page, pageSize);

  if (artistLoading || albumsLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  if (artistError || albumsError) {
    return (
      <p className='text-center mt-20 text-red-500'>
        {artistError || albumsError}
      </p>
    );
  }

  if (!artist) return null;

  const openModal = (album: Album) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  return (
    <div className='relative bg-[#E5E6E4] px-6 pt-24 sm:py-50 lg:px-0'>
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
      />
      {selectedAlbum && (
        <AlbumSongsModal
          isOpen={isModalOpen}
          album={selectedAlbum}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ArtistDetailsContent;
