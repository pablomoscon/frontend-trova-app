import { useState, useEffect, useCallback } from 'react';
import { Album, AlbumsResponse } from '../../Interfaces/AlbumInterface';
import { fetchAlbums } from '../../services/albumService';

export const useFetchAlbums = (size: number = 15) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const loadAlbums = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: AlbumsResponse = await fetchAlbums(page, size);
            setAlbums(response.albums);
            setTotalPages(response.totalPages);
            setError(null);
        } catch (err) {
            setError('Failed to load albums');
        } finally {
            setIsLoading(false);
        }
    }, [page, size]);

    useEffect(() => {
        loadAlbums();
    }, [loadAlbums]);

    return {
        albums,
        isLoading,
        error,
        page,
        setPage,
        totalPages,
        reloadAlbums: loadAlbums,
    };
};
