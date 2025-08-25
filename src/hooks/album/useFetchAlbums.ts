import { useState, useEffect, useCallback } from 'react';
import { Album, AlbumsData } from '../../Interfaces/AlbumInterface';
import { fetchAlbums } from '../../services/albumService';

export const useFetchAlbums = (page: number, size: number) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setLoading] = useState(true);   
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);    
    const [currentPage, setCurrentPage] = useState(0);

    const loadAlbums = useCallback(async () => {
        setLoading(true);
        try {
            const res: AlbumsData = await fetchAlbums(page, size);
            setAlbums(res.albums);
            setTotalPages(Math.max(1, res.totalPages));
            setCurrentPage(res.currentPage ?? 0);
            setError(null);
        } catch (e) {
            console.error(e);
            const msg =
                e instanceof Error ? e.message : 'Failed to load albums';
            setAlbums([]);
            setTotalPages(1);
            setCurrentPage(0);
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [page, size]);

    useEffect(() => { loadAlbums(); }, [loadAlbums]);

    return {
        albums,
        isLoading,
        error,
        totalPages,
        currentPage,
        reloadAlbums: loadAlbums
    };
};
