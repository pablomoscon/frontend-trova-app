import { useEffect, useState } from 'react';
import { Album } from '../../Interfaces/AlbumInterface';
import { fetchAlbumById } from '../../services/albumService';

export const useFetchAlbumById = (albumId: number | null) => {
    const [album, setAlbum] = useState<Album | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (albumId === null) return;

        const fetchAlbum = async () => {
            setIsLoading(true);
            try {
                const data = await fetchAlbumById(albumId);
                setAlbum(data);
            } catch (err) {
                console.error('Error fetching album by ID', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbum();
    }, [albumId]);

    return { album, isLoading };
};
