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
    setPageSize,
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
    <div className='bg-[#E5E6E4] px-6 pt-30 sm:pt-40 md:pt-45 lg:pt-55 lg:px-0'>
      <ArtistHeader artist={artist} />

      <div
        className='mt-15 sm:mt-25 md:mt-30 px-8 pt-15 sm:pt-25 md:pt-30 pb-8 text-center bg-gradient-to-tr
    from-[#F3F4EE]
    via-[#E3E4DF]
    to-[#D7D8CE]border-t border-t-gray-400  shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] w-full mx-auto'
      >
        <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-wide mb-3'>
          Catálogo de discos de{' '}
          <span className='text-gray-600'>{artist.name}</span>
        </h2>
        <p className='text-base sm:text-lg text-gray-700 max-w-2xl mx-auto pb-15 sm:pb-10'>
          Discos seleccionados para descubrir y disfrutar en tus plataformas
          favoritas
        </p>

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
    </div>
  );
};

export default ArtistDetailsContent;
