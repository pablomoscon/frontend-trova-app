import { useEffect, useState } from 'react';
import { fetchArtistById } from '../../services/artistService';
import { Artist } from '../../Interfaces/ArtistInterface';

export const useArtistDetails = (artistId: number) => {
    const [artist, setArtist] = useState<Artist | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const getArtist = async () => {
            try {
                const data = await fetchArtistById(artistId);
                setArtist(data);
            } catch (err) {
                setError('Error loading artist');
            } finally {
                setLoading(false);
            }
        };
        getArtist();
    }, [artistId]);

    return { artist, loading, error };
};
