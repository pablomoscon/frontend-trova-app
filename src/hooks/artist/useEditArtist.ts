import { useState } from 'react';
import { Artist } from '../../Interfaces/ArtistInterface';
import { editArtist } from '../../services/artistService';

export const useEditArtist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const updateArtist = async (id: number, data: Partial<Artist>) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const updated = await editArtist(id, data);
            setSuccess(true);
            return updated;
        } catch (err: any) {
            setError(err?.message || 'Error al editar el artista');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateArtist,
        isLoading,
        error,
        success,
    };
};
