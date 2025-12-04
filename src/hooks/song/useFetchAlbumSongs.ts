import { useState, useEffect } from 'react';
import { Song, UseAlbumSongsResult } from '../../Interfaces/SongInterface';
import { fetchSongsByAlbumId } from '../../services/songsService';
import { ApiError } from '../../types/Error';

export const useFetchAlbumSongs = (albumId: number | null): UseAlbumSongsResult => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (albumId === null) return; 

        let isMounted = true;

        const loadSongs = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchSongsByAlbumId(albumId);
                if (isMounted) setSongs(data);
            } catch (err: unknown) {
                const error = err as ApiError;

                if (isMounted) {
                    setError(error?.response?.data?.message || error?.message || 'Error al obtener las canciones');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadSongs();

        return () => { isMounted = false; };
    }, [albumId]);

    return { songs, loading, error };
};
