import { useState } from 'react';
import { deleteAlbum } from '../../services/albumService';
import {
    showConfirmationDialog,
    showErrorAlert,
    showSuccessAlert,
} from '../../utils/showAlertUtils';

export const useDeleteAlbum = (reloadAlbums?: () => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDelete = async (id: number) => {
        const confirmed = await showConfirmationDialog(
            '¿Estás seguro?',
            'Esta acción eliminará el álbum permanentemente.'
        );
        if (!confirmed) return;

        try {
            setIsLoading(true);
            setDeleteError(null);

            await deleteAlbum(id);

            showSuccessAlert('Álbum eliminado con éxito', 'El álbum ha sido eliminado correctamente.');

            if (reloadAlbums) {
                await reloadAlbums();
            }
        } catch (error: any) {
            console.error('Error al eliminar álbum:', error);
            setDeleteError('Error al eliminar álbum');
            showErrorAlert(
                'Error al eliminar álbum',
                error?.response?.data?.message || error.message || 'No se pudo eliminar el álbum.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return { handleDelete, isLoading, deleteError };
};
