import { useState, useEffect, useRef } from 'react';
import { useDeleteArtist } from './useDeleteArtist';
import { useSearchArtists } from './useSearchArtists';
import { useFetchArtists } from './useFetchArtists';
import { useToggleArtistStatus } from './useToggleArtistStatus';
import { showErrorAlert } from '../../utils/showAlertUtils';
import { useScroll } from '../shared/useScroll';
import { usePageAndSearch } from '../shared/usePageAndSearch';

export const useManagementArtists = (pageSizeInitial = 9, pageKey = 'artistsPage') => {
  const {
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    handleSearchKeyDown
  } = usePageAndSearch(pageKey);

  const [pageSize, setPageSize] = useState(pageSizeInitial);
  const [hasSearched, setHasSearched] = useState(false);

  const searching = hasSearched && searchTerm.trim() !== '';

  const scrollRef = useRef<HTMLDivElement>(null);
  const offset = window.innerWidth < 640 ? 90 : 240;
  useScroll(scrollRef, { deps: [page], behavior: 'auto', offset });

  const {
    artists: backendArtists,
    totalPages: totalPagesBackend,
    isLoading: loadingBackend,
    error: errorBackend,
    reloadArtists,
  } = useFetchArtists(page - 1, pageSize);

  const {
    artists: searchArtistsList,
    isLoading: loadingSearch,
    error: errorSearch,
    totalPages: totalPagesSearch,
    reloadSearch: reloadhSearch,
  } = useSearchArtists(searchTerm, page, pageSize);

  const artists = searching ? searchArtistsList : backendArtists;
  const isLoading = searching ? loadingSearch : loadingBackend;
  const error = searching ? errorSearch : errorBackend;
  const totalPages = searching ? totalPagesSearch : totalPagesBackend;

  useEffect(() => {
    if (!isLoading && totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [isLoading, page, totalPages]);

  const { handleDelete } = useDeleteArtist(searching ? reloadhSearch : reloadArtists);

  const { toggleStatus } = useToggleArtistStatus(
    searching ? reloadhSearch : reloadArtists
  );

  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openEditModal = (id: number) => {
    setSelectedArtistId(id);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setSelectedArtistId(null);
    setShowModal(false);

    if (searching) {
      reloadhSearch();
    } else {
      reloadArtists();
    }
  };

  const onPageSizeChange = (sz: number) => {
    setPageSize(sz);
    setPage(1);
  };

  const onSearchChange = (val: string) => {
    setSearchTerm(val);
    if (val.trim() === '') {
      setHasSearched(false);
      setPage(1);
    }
  };

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim() === '') {
        showErrorAlert('Error', 'Por favor ingresá un término para buscar');
        return;
      }
      setHasSearched(true);
      setPage(1);
    }
    handleSearchKeyDown(e);
  };

  return {
    artists,
    totalPages,
    isLoading,
    error,
    toggleStatus,
    triggerDelete: handleDelete,
    searching,
    showModal,
    selectedArtistId,
    openEditModal,
    closeEditModal,
    reload: searching ? reloadhSearch : reloadArtists,
    scrollRef,
    page,
    setPage,
    pageSize,
    setPageSize: onPageSizeChange,
    searchTerm,
    setSearchTerm,
    onSearchChange,
    onSearchKeyDown,
  };
};
