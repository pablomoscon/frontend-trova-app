import { useState, useEffect } from 'react';
import { Song, UseAlbumSongsResult } from '../../Interfaces/SongInterface';
import { fetchSongsByAlbumId } from '../../services/songsService';

export const useFetchAlbumSongs = (albumId: number): UseAlbumSongsResult => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadSongs = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchSongsByAlbumId(albumId);
                if (isMounted) setSongs(data);
            } catch (err: any) {
                if (isMounted) setError(err.message || 'Failed to fetch songs');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadSongs();

        return () => {
            isMounted = false;
        };
    }, [albumId]);

    return { songs, loading, error };
};
