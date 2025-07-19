import { useEffect, useState } from 'react';
import { useSearchAlbums } from '../../hooks/album/useSearchAlbums';
import { usePageAndSearch } from '../../hooks/shared/usePageAndSearch';

export const useSearchResults = (
    initialQuery: string,
    pageSize: number,
    pageKey = 'searchResultsPage'
) => {
    const {
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        handleSearchKeyDown,
    } = usePageAndSearch(pageKey, initialQuery);

    const [hasSearched, setHasSearched] = useState(!!initialQuery);

    // Sincronizar searchTerm con initialQuery si cambia externamente
    useEffect(() => {
        // Solo actualizar si el valor es distinto para evitar loops
        if (initialQuery !== searchTerm) {
            setSearchTerm(initialQuery);
            setPage(1);  // Resetea página al cambiar búsqueda externa
        }
    }, [initialQuery]);

    const { albums, isLoading, error, totalPages } = useSearchAlbums(
        searchTerm,
        page - 1,
        pageSize,
        hasSearched
    );

    useEffect(() => {
        const isValid = searchTerm.trim() !== '';
        setHasSearched(isValid);
        if (!isValid) setPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (!isLoading && page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [isLoading, page, totalPages, setPage]);

    return {
        albums,
        isLoading,
        error,
        totalPages,
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        handleSearchKeyDown,
        hasSearched,
    };
};
