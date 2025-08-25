import { useState, useCallback, useEffect } from 'react';
import { Album, SearchAlbumsProps, Status } from '../../Interfaces/AlbumInterface';
import { searchAlbums } from '../../services/albumService';
import { showErrorAlert } from '../../utils/showAlertUtils';

export const useSearchAlbums = (
    query: string,
    page: number,
    pageSize: number,
    autoFetch = false,
    status?: Status

): SearchAlbumsProps => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        if (query.trim() === '') {
            setAlbums([]);
            setTotalPages(0);
            setCurrentPage(0);
            setError(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const safePage = Math.max(0, page);
            const res = await searchAlbums(query.trim(), safePage, pageSize, status);
            setAlbums(res.albums);
            setTotalPages(Math.max(1, res.totalPages));
            setCurrentPage(res.currentPage ?? 0);
            setError(null);
        } catch (e) {
            console.error(e);
            setAlbums([]);
            setTotalPages(0);
            setCurrentPage(0);
            setError('No se pudo buscar álbumes');
            showErrorAlert('Error', 'No se pudo buscar álbumes');
        } finally {
            setIsLoading(false);
        }
    }, [query, page, pageSize, status]);

    useEffect(() => {
        if (autoFetch) {
            fetch();
        }
    }, [fetch, autoFetch]);

    return {
        albums,
        isLoading,
        error,
        totalPages,
        currentPage,
        refresh: fetch,
    };
};