import { useEffect, useState, useCallback } from 'react';
import { fetchArtist } from '../../services/artistService';
import { Artist } from '../../Interfaces/ArtistInterface';

export const useArtistFetch = (includeAlbums: boolean = false) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    const loadArtists = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchArtist(includeAlbums);
            setArtists(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Error fetching artists');
        } finally {
            setLoading(false);
        }
    }, [includeAlbums]);

    useEffect(() => {
        loadArtists();
    }, [loadArtists]);

    return { artists, setArtists, loading, error, reloadArtists: loadArtists };
};