import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchAlbumsResultsProps } from '../../../Interfaces/AlbumInterface';
import { useScroll } from '../../../hooks/shared/useScroll';
import Spinner from '../../shared/Spinner';
import AlbumList from '../AlbumList/AlbumList';
import AlbumSongsModal from '../../albumComponents/AlbumCard/AlbumSongsModal';
import { useFetchAlbumById } from '../../../hooks/album/useFetchAlbumById';
import { useSearchAlbumsResults } from '../../../hooks/album/useSearchAlbumsResults';

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

  // Detectar cambio de query sin usar useEffect
  const prevQueryRef = useRef(query);
  if (prevQueryRef.current !== query) {
    prevQueryRef.current = query;
    setShouldScroll(true);
    setPage(1);
  }

  useScroll(shouldScroll ? listTopRef : null, {
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

  const openModal = (albumId: number) => {
    setSelectedAlbumId(albumId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbumId(null);
  };

  return (
    <section className='bg-[#E5E6E4] min-h-screen w-full'>
      {isLoading ? (
        <div className='py-12'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='py-12 text-center text-red-500'>Error: {error}</div>
      ) : !albums || albums.length === 0 ? (
        <div className='py-12 text-center text-gray-600'>
          No se encontraron álbumes.
        </div>
      ) : (
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

          {selectedAlbum && isModalOpen && !isAlbumLoading && (
            <AlbumSongsModal
              isOpen={isModalOpen}
              albumId={selectedAlbum.id}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </section>
  );
};

export default SearchAlbumsResults;
