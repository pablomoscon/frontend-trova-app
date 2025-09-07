import React, { useState } from 'react';
import Spinner from '../../Shared/Spinner';
import AlbumSongsModal from '../../AlbumComponents/AlbumCard/AlbumSongsModal';
import { useDetailsArtist } from '../../../hooks/artist/useDetailsArtist';
import { useFetchAlbumsByArtist } from '../../../hooks/album/useFetchAlbumsByArtist';
import { useFetchAlbumById } from '../../../hooks/album/useFetchAlbumById';
import { useFetchAlbumSongs } from '../../../hooks/song/useFetchAlbumSongs';
import { usePageAndSearch } from '../../../hooks/shared/usePageAndSearch';
import ArtistHeader from '../../ArtistComponents/ArtistDetails/ArtistHeader';
import ArtistAlbumsSection from '../../ArtistComponents/ArtistAlbumsSection/ArtistAlbumsSection';

const artistSortOptions: { name: string; value: 'asc' | 'desc' }[] = [
  { name: 'Más antiguo', value: 'asc' },
  { name: 'Más reciente', value: 'desc' },
];

const ArtistDetailsContent: React.FC<{ artistId: number }> = ({ artistId }) => {
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
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

  // Fetch selected album and its songs
  const { album: selectedAlbum, isLoading: isAlbumLoading } =
    useFetchAlbumById(selectedAlbumId);
  const {
    songs,
    loading: songsLoading,
    error: songsError,
  } = useFetchAlbumSongs(selectedAlbumId);

  const openModal = (albumId: number) => {
    setSelectedAlbumId(albumId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbumId(null);
  };

  if (artistLoading || albumsLoading) return <Spinner />;
  if (artistError || albumsError)
    return (
      <p className='text-center mt-20 text-red-500'>
        {artistError || albumsError}
      </p>
    );
  if (!artist) return null;

  return (
    <div className='bg-[#E5E6E4] px-6 pt-30 sm:pt-40 md:pt-45 lg:pt-55 lg:px-0'>
      <ArtistHeader artist={artist} />

      <div
        className='mt-15 sm:mt-25 md:mt-30 px-8 pt-15 sm:pt-25 md:pt-30 pb-8 text-center bg-gradient-to-tr
      from-[#F3F4EE] via-[#E3E4DF] to-[#D7D8CE] border-t border-t-gray-400 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] w-full mx-auto'
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
          sortOptions={artistSortOptions}
          selectedSort={sortOrder}
          setSelectedSort={setSortOrder}
          albumsLoading={albumsLoading}
        />

        {/* Modal */}
        {selectedAlbum && isModalOpen && (
          <AlbumSongsModal
            isOpen={isModalOpen}
            album={selectedAlbum}
            songs={songs}
            loading={isAlbumLoading || songsLoading}
            error={songsError}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistDetailsContent;
