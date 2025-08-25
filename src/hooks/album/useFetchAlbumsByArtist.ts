import { useEffect, useState } from 'react';
import { Album, AlbumsData } from '../../Interfaces/AlbumInterface';
import { fetchAlbumsByArtist } from '../../services/albumService';

export const useFetchAlbumsByArtist = (
    artistId: number | null,
    page: number,
    sortOrder: 'asc' | 'desc' = 'asc'
) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(6);
    const [pageSizeReady, setPageSizeReady] = useState(false);

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width < 640) setPageSize(4);
            else if (width < 1024) setPageSize(6);
            else setPageSize(9);
            setPageSizeReady(true);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (artistId === null) return;
        if (!pageSizeReady) return; // espera a tener pageSize calculado

        setLoading(true);
        fetchAlbumsByArtist(artistId, page - 1, pageSize, sortOrder)
            .then((data: AlbumsData) => {
                setAlbums(data.albums);
                setTotalPages(data.totalPages);
                setError(null);
            })
            .catch(() => {
                setError('Error fetching albums by artist');
            })
            .finally(() => setLoading(false));
    }, [artistId, page, pageSize, sortOrder, pageSizeReady]);

    return {
        albums,
        loading,
        error,
        totalPages,
        pageSize,
        setPageSize,
    };
};
