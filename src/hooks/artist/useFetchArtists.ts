import { useEffect, useState, useCallback } from 'react';
import { Artist } from '../../Interfaces/ArtistInterface';
import { fetchArtists } from '../../services/artistService';

export const useFetchArtists = (
    page: number = 0,
    size: number = 15
) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    const loadArtists = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchArtists(page, size);
            setArtists(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Error fetching artists');
        } finally {
            setLoading(false);
        }
    }, [page, size]);

    useEffect(() => {
        loadArtists();
    }, [loadArtists]);

    return { artists, setArtists, loading, error, reloadArtists: loadArtists };
};