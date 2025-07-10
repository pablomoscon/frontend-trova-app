import { useState, useEffect, useRef } from 'react';
import { Artist } from '../../Interfaces/ArtistInterface';
import { useDeleteArtist } from './useDeleteArtist';
import { useSearchArtists } from './useSearchArtists';
import { useFetchArtists } from './useFetchArtists';
import { useEditArtist } from './useEditArtist';
import { showSuccessAlert, showErrorAlert } from '../../utils/showAlertUtils';
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
  useScroll(scrollRef, { deps: [page], behavior: 'smooth', offset });

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
    refresh: refreshSearch,
  } = useSearchArtists(searchTerm, page, pageSize);

  const artists = searching ? searchArtistsList : backendArtists;
  const isLoading = searching ? loadingSearch : loadingBackend;
  const error = searching ? errorSearch : errorBackend;
  const totalPages = searching ? totalPagesSearch : totalPagesBackend;
  
  useEffect(() => {
    if (!isLoading && totalPages > 0 && page > totalPages) {
      if (page !== totalPages) {
        setPage(totalPages);
      }
    }
  }, [isLoading, page, totalPages, setPage]);

  const { handleDelete } = useDeleteArtist(searching ? refreshSearch : reloadArtists);
  const { updateArtist } = useEditArtist();

  const toggleStatus = async (artist: Artist) => {
    const newStatus = artist.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const formData = new FormData();
      formData.append('status', newStatus);

      await updateArtist(artist.id!, formData);
      showSuccessAlert('Estado actualizado', `El artista fue ${newStatus === 'SUSPENDED' ? 'Suspendido' : 'Activado'}.`);
      searching ? refreshSearch() : reloadArtists();
    } catch (err: any) {
      showErrorAlert('Error', err?.response?.data?.message || 'No se pudo cambiar el estado');
    }
  };

  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openEditModal = (id: number) => {
    setSelectedArtistId(id);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setSelectedArtistId(null);
    setShowModal(false);
    searching ? refreshSearch() : reloadArtists();
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
    reload: searching ? refreshSearch : reloadArtists,
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
