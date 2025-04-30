import React, { useState } from 'react';
import ArtistHeader from './ArtistHeader';
import ArtistAlbumsSection from '../ArtistAlbumsSection/ArtistAlbumsSection';
import AlbumSongsModal from './AlbumSongsModal';
import { ArtistProps } from '../../../Interfaces/ArtistInterface';
import { Album } from '../../../Interfaces/AlbumInterface';
import Spinner from '../../Spinner/Spinner';
import { useArtistDetails } from '../../../hooks/artist/useArtistDetails';

const ArtistDetailsContent: React.FC<ArtistProps> = ({ artistId }) => {
  const { artist, loading, error } = useArtistDetails(artistId);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  if (error) return <p className='text-center mt-20 text-red-500'>{error}</p>;
  if (!artist) return null;

  const openModal = (album: Album) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  const albums = artist.albums ?? [];

  return (
    <div className='relative bg-[#E5E6E4] px-6 pt-24 sm:py-50 lg:px-0'>
      <ArtistHeader artist={artist} />
      <ArtistAlbumsSection
        artistName={artist.name}
        albums={albums}
        onAlbumClick={openModal}
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
