import { useState, useEffect, useCallback } from 'react';
import { Album, SearchAlbumsProps } from '../../Interfaces/AlbumInterface';
import { searchAlbums } from '../../services/albumService';
import { showErrorAlert } from '../../utils/showAlertUtils';

export const useSearchAlbums = (
    query: string,
    page: number,
    pageSize: number
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
            const res = await searchAlbums(query.trim(), page, pageSize);
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
    }, [query, page, pageSize]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { albums, isLoading, error, totalPages, currentPage, refresh: fetch };
};
