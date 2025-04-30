import { useState } from 'react';
import { deleteArtist } from '../../services/artistService';
import {
    showDeleteConfirmation,
    showSuccessAlert,
    showErrorAlert,
} from '../../utils/showAlertUtils';

export const useArtistDelete = (reloadArtists: () => void) => {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<null | string>(null);

    const handleDelete = async (id: number) => {
        const confirmed = await showDeleteConfirmation();
        if (!confirmed) return;

        try {
            setDeleting(true);
            setDeleteError(null);
            await deleteArtist(id);
            showSuccessAlert('Artista eliminado con éxito');
            reloadArtists();
        } catch (error) {
            showErrorAlert('Error al eliminar el artista');
            setDeleteError('Error al eliminar el artista');
        } finally {
            setDeleting(false);
        }
    };

    return {
        handleDelete,
        deleting,
        deleteError,
    };
};
