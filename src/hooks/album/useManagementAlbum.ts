import { useState, useEffect, useRef } from 'react';
import { usePageAndSearch } from '../shared/usePageAndSearch';
import { useFetchAlbums } from './useFetchAlbums';
import { useSearchAlbums } from './useSearchAlbums';
import { useDeleteAlbum } from './useDeleteAlbum';
import { useToggleAlbumStatus } from './useToggleAlbumStatus';
import { useScroll } from '../shared/useScroll';
import { showErrorAlert } from '../../utils/showAlertUtils';

export const useManagementAlbum = (pageSizeInitial = 15, pageKey = 'albumsPage') => {
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

    useScroll(scrollRef as React.RefObject<HTMLElement>, {
        deps: [page],
        behavior: 'auto',
        offset,
    });

    const {
        albums: backendAlbums,
        isLoading: loadingBackend,
        error: errorBackend,
        totalPages: totalPagesBackend,
        reloadAlbums,
    } = useFetchAlbums(page - 1, pageSize);

    const {
        albums: searchAlbumsList,
        isLoading: loadingSearch,
        error: errorSearch,
        totalPages: totalPagesSearch,
        refresh: refreshSearch,
    } = useSearchAlbums(searchTerm, page - 1, pageSize, searching);

    const albums = searching ? searchAlbumsList : backendAlbums;
    const isLoading = searching ? loadingSearch : loadingBackend;
    const error = searching ? errorSearch : errorBackend;
    const totalPages = searching ? totalPagesSearch : totalPagesBackend;

    useEffect(() => {
        if (!isLoading && page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [isLoading, page, totalPages, setPage]);

    const { handleDelete } = useDeleteAlbum(searching ? refreshSearch : reloadAlbums);

    const { toggleStatus } = useToggleAlbumStatus(searching ? refreshSearch : reloadAlbums);

    const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (id: number) => {
        setSelectedAlbumId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedAlbumId(null);
        setShowModal(false);
        if (searching) {
            refreshSearch();
        } else {
            reloadAlbums();
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
        albums,
        isLoading,
        error,
        totalPages,
        searching,
        page,
        setPage,
        pageSize,
        setPageSize: onPageSizeChange,
        searchTerm,
        onSearchChange,
        onSearchKeyDown,
        toggleStatus,
        handleDelete,
        showModal,
        selectedAlbumId,
        reload: searching ? refreshSearch : reloadAlbums,
        handleEdit,
        handleCloseModal,
        scrollRef,
    };
};
