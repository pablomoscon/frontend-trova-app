import { useState } from 'react';
import { deleteArtist } from '../../services/artistService';
import {
   
    showSuccessAlert,
    showErrorAlert,
    showConfirmationDialog,
} from '../../utils/showAlertUtils';

export const useDeleteArtist= (reloadArtists: () => void) => {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<null | string>(null);

    const handleDelete = async (id: number) => {
        const confirmed = await showConfirmationDialog();
        if (!confirmed) return;

        try {
            setDeleting(true);
            setDeleteError(null);
            await deleteArtist(id);
            showSuccessAlert('Artista eliminado con éxito', 'El artista ha sido eliminado correctamente.');
            reloadArtists();
        } catch (error) {
            showErrorAlert('Error al eliminar el artista', 'No se pudo eliminar el artista.');
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
