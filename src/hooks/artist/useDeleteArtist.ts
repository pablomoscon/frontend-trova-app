import { useState } from 'react';
import { deleteArtist } from '../../services/artistService';
import {
    showSuccessAlert,
    showErrorAlert,
    showConfirmationDialog,
} from '../../utils/showAlertUtils';

export const useDeleteArtist = (
    reloadArtists?: () => void
) => {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDelete = async (id: number) => {
        const confirmed = await showConfirmationDialog();
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
                await reloadArtists();
            }
        } catch (err: any) {
            console.error('Delete artist error:', err);
            showErrorAlert(
                'Error al eliminar el artista',
                err?.response?.data?.message || err.message || 'Error desconocido.'
            );
            setDeleteError('Error al eliminar el artista');
        } finally {
            setDeleting(false);
        }
    };

    return { handleDelete, deleting, deleteError };
};
