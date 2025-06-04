import { useEffect, useState, useCallback } from 'react';
import { Album, AlbumsResponse } from '../../Interfaces/AlbumInterface';
import { fetchAlbumsByArtist } from '../../services/albumService';

export const useFetchAlbumsByArtist = (
    artistId: number | null,
    initialPage: number = 1,
    pageSize: number = 15
) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState<number>(initialPage);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);

    const loadAlbums = useCallback(async () => {
        if (artistId === null) return;

        setLoading(true);
        try {
            const data: AlbumsResponse = await fetchAlbumsByArtist(
                artistId,
                page,
                pageSize
            );
            setAlbums(data.albums);
            setTotalPages(data.totalPages);
            setTotalItems(data.totalItems);
            setError(null);
        } catch (err) {
            console.error(err);
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
        totalPages,
        totalItems,
        setPage,
        reloadAlbums: loadAlbums,
    };
};