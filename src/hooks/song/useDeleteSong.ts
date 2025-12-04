import { useState, useCallback } from 'react';
import { deleteSongs as deleteSongsRequest } from '../../services/songsService';
import {
    showConfirmationDialog,
    showSuccessAlert,
    showErrorAlert,
} from '../../utils/showAlertUtils';

export const useDeleteSongs = () => {
    const [loading, setLoading] = useState(false);

    const handleDelete = useCallback(async (ids: number[]) => {
        if (!ids.length) return false;

        const confirmed = await showConfirmationDialog(
            '¿Estás seguro?',
            `Se eliminarán ${ids.length} canción(es). Esta acción no se puede deshacer.`,
            'Sí, eliminar'
        );

        if (!confirmed) return false;

        try {
            setLoading(true);
            await deleteSongsRequest(ids);
            showSuccessAlert('Éxito', 'Las canciones fueron eliminadas con éxito.');
            return true;
        } catch (err) {
            console.error('Error al eliminar canciones:', err);
            showErrorAlert('Error', 'No se pudieron eliminar las canciones.');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { deleteSongs: handleDelete, loading };
};
