import { useEffect, useState, useCallback } from 'react';
import { Album, AlbumsData } from '../../Interfaces/AlbumInterface';
import { fetchAlbumsByArtist } from '../../services/albumService';

export const useFetchAlbumsByArtist = (
    artistId: number | null,
    initialPage: number = 1,
    initialPageSize: number = 15
) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // single source of truth
    const [page, setPage] = useState<number>(initialPage);
    const [pageSize, setPageSize] = useState<number>(initialPageSize);
    const [totalPages, setTotalPages] = useState<number>(0);

    const loadAlbums = useCallback(async () => {
        if (artistId === null) return;

        setLoading(true);
        try {
            const data: AlbumsData = await fetchAlbumsByArtist(artistId, page, pageSize);
            setAlbums(data.albums);
            setTotalPages(data.totalPages);
            setError(null);
        } catch (err) {
            setError('Error fetching albums by artist');
        } finally {
            setLoading(false);
        }
    }, [artistId, page, pageSize]);

    useEffect(() => {
        loadAlbums();
    }, [loadAlbums]);

    return {
        albums,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        setPage,     
        setPageSize, 
    };
};