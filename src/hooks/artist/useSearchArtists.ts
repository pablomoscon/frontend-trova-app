import { useState, useEffect } from 'react';
import { searchArtists } from '../../services/artistService';
import { Artist } from '../../Interfaces/ArtistInterface';
import { ApiError } from '../../types/Error';

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
            } catch (e: unknown) {
                const error = e as ApiError;

                setArtists([]);
                setPages(1);
                setError(error?.response?.data?.message || error?.message || 'Búsqueda fallida');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [term, page, size]);
    
    const reloadSearch = async () => {
        if (term.trim() === '') return;
        setIsLoading(true);
        try {
            const { content, totalPages } = await searchArtists(term, page - 1, size);
            setArtists(content);
            setPages(totalPages);
            setError(null);
        } catch (e: unknown) {
            const error = e as { message?: string };

            setArtists([]);
            setPages(1);
            setError(error?.message || 'Búsqueda fallida');
        } finally {
            setIsLoading(false);
        }
    };

    return { artists, totalPages, isLoading, error, reloadSearch };
};
