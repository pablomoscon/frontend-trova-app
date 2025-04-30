import { useState, useEffect, useCallback } from 'react';
import { Album } from '../../Interfaces/AlbumInterface';
import { fetchAlbums } from '../../services/albumService';

export const useAlbumsFetch = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadAlbums = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedAlbums = await fetchAlbums();
            setAlbums(fetchedAlbums);
            setError(null);
        } catch (err) {
            setError('Failed to load albums');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAlbums();
    }, [loadAlbums]);

    return { albums, isLoading, error, reloadAlbums: loadAlbums };
};
