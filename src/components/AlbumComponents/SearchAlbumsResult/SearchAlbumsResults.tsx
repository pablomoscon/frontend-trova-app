import React, { RefObject, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchAlbumsResultsProps } from '../../../Interfaces/AlbumInterface';
import { useScroll } from '../../../hooks/shared/useScroll';
import Spinner from '../../Shared/Spinner';
import AlbumSongsModal from '../AlbumCard/AlbumSongsModal';
import { useFetchAlbumById } from '../../../hooks/album/useFetchAlbumById';
import { useSearchAlbumsResults } from '../../../hooks/album/useSearchAlbumsResults';
import { useFetchAlbumSongs } from '../../../hooks/song/useFetchAlbumSongs';
import AlbumList from '../AlbumList/AlbumList';

const SearchAlbumsResults: React.FC<SearchAlbumsResultsProps> = ({
  initialQuery = '',
  pageSize = 9,
}) => {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('query') ?? '';
  const query = initialQuery || queryFromUrl;

  const { albums, isLoading, error, totalPages, page, setPage } =
    useSearchAlbumsResults(query, pageSize);

  const listTopRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  const offset = window.innerWidth < 640 ? 90 : 240;
  const prevQueryRef = useRef(query);

  if (prevQueryRef.current !== query) {
    prevQueryRef.current = query;
    setShouldScroll(true);
    setPage(1);
  }

  useScroll(shouldScroll ? (listTopRef as RefObject<HTMLElement>) : undefined, {
    deps: [page, query],
    behavior: 'auto',
    offset,
    enabled: shouldScroll,
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setShouldScroll(true);
      setPage(newPage);
    }
  };

  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { album: selectedAlbum, isLoading: isAlbumLoading } =
    useFetchAlbumById(selectedAlbumId);

  const {
    songs,
    loading: isSongsLoading,
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


  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = (
      <div className='py-12 text-center text-red-500'>Error: {error}</div>
    );
  } else if (!albums || albums.length === 0) {
    content = (
      <div className='py-12 text-center text-gray-600'>
        No se encontraron álbumes.
      </div>
    );
  } else {
    content = (
      <>
        <div ref={listTopRef} />
        <AlbumList
          albums={albums ?? []}
          onClick={openModal}
          page={page}
          totalPages={totalPages}
          setPage={handlePageChange}
          pageSize={pageSize}
          setPageSize={() => {}}
        />

        {selectedAlbum && isModalOpen && (
          <AlbumSongsModal
            isOpen={isModalOpen}
            album={selectedAlbum}
            songs={songs}
            loading={isAlbumLoading || isSongsLoading}
            error={songsError}
            onClose={closeModal}
          />
        )}
      </>
    );
  }

  return (
    <section className='bg-[#E5E6E4] min-h-screen w-full pt-10 pb-40'>
      {content}
    </section>
  );
};

export default SearchAlbumsResults;
