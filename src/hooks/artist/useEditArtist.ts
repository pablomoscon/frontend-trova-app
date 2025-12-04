import { useState } from 'react';
import { Artist } from '../../Interfaces/ArtistInterface';
import { editArtist } from '../../services/artistService';
import { ApiError } from '../../types/Error';

export const useEditArtist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const updateArtist = async (id: number, formData: FormData): Promise<Artist> => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const updated = await editArtist(id, formData);
            setSuccess(true);
            return updated;
        } catch (err: unknown) {
            const error = err as ApiError;

            setError(error?.message || 'Error al editar el artista');
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
