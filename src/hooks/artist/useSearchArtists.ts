import { useState, useEffect } from 'react';
import { searchArtists } from '../../services/artistService';
import { Artist } from '../../Interfaces/ArtistInterface';

export const useSearchArtists = (term: string, page: number, size: number) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [totalPages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (term.trim() === '') {
            setArtists([]);
            setPages(1);
            setError(null);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { content, totalPages } = await searchArtists(term, page - 1, size);
                setArtists(content);
                setPages(totalPages);
                setError(null);
            } catch (e: any) {
                setArtists([]);
                setPages(1);
                setError(e.message || 'Búsqueda fallida');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [term, page, size]);
    
    const refresh = async () => {
        if (term.trim() === '') return;
        setIsLoading(true);
        try {
            const { content, totalPages } = await searchArtists(term, page - 1, size);
            setArtists(content);
            setPages(totalPages);
            setError(null);
        } catch (e: any) {
            setArtists([]);
            setPages(1);
            setError(e.message || 'Búsqueda fallida');
        } finally {
            setIsLoading(false);
        }
    };

    return { artists, totalPages, isLoading, error, refresh };
};
