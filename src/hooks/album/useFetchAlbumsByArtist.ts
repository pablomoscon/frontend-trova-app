import { useEffect, useState } from 'react';
import { Album, AlbumsData } from '../../Interfaces/AlbumInterface';
import { fetchAlbumsByArtist } from '../../services/albumService';

export const useFetchAlbumsByArtist = (
    artistId: number | null,
    page: number
) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(6);

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width < 640) setPageSize(4);
            else if (width < 1024) setPageSize(6);
            else setPageSize(9);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cada vez que cambian artistId, page o pageSize, hacemos fetch
    useEffect(() => {
        if (artistId === null) return;

        setLoading(true);
        fetchAlbumsByArtist(artistId, page, pageSize)
            .then((data: AlbumsData) => {
                setAlbums(data.albums);
                setTotalPages(data.totalPages);
                setError(null);
            })
            .catch(() => {
                setError('Error fetching albums by artist');
            })
            .finally(() => setLoading(false));
    }, [artistId, page, pageSize]);

    return {
        albums,
        loading,
        error,
        totalPages,
        pageSize,
        setPageSize,
    };
};
