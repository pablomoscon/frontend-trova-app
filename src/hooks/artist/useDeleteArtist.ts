import { useState } from 'react';
import { deleteArtist } from '../../services/artistService';
import {
    showSuccessAlert,
    showErrorAlert,
    showConfirmationDialog,
} from '../../utils/showAlertUtils';
import { ApiError } from '../../types/Error';

export const useDeleteArtist = (
    reloadArtists?: () => void
) => {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDelete = async (id: number) => {
        const confirmed = showConfirmationDialog();
        if (!confirmed) return;

        try {
            setDeleting(true);
            setDeleteError(null);

            await deleteArtist(id);

            showSuccessAlert(
                'Artista eliminado con éxito',
                'El artista ha sido eliminado correctamente.'
            );

            if (reloadArtists) {
                reloadArtists();
            }
        } catch (err: unknown) {
            console.error('Delete artist error:', err);

            const error = err as ApiError;

            showErrorAlert(
                'Error al eliminar el artista',
                error?.response?.data?.message ||
                error?.message ||
                'Error desconocido.'
            );

            setDeleteError('Error al eliminar el artista');
        } finally {
            setDeleting(false);
        }
    };

    return { handleDelete, deleting, deleteError };
};
