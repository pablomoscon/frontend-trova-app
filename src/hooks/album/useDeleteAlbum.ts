import { useState, useEffect } from 'react';
import { deleteAlbum } from '../../services/albumService';
import { showConfirmationDialog, showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';

export const useDeleteAlbum = (reloadAlbums: () => void) => {
    const [albumIdToDelete, setAlbumIdToDelete] = useState<number | null>(null);

    useEffect(() => {
        const deleteSelectedAlbum = async () => {
            if (albumIdToDelete === null) return;

            const confirmed = await showConfirmationDialog();
            if (!confirmed) {
                setAlbumIdToDelete(null);
                return;
            }

            try {
                await deleteAlbum(albumIdToDelete);
                showSuccessAlert('Álbum eliminado con éxito', 'El álbum ha sido eliminado correctamente.');
                reloadAlbums();
            } catch (error) {
                showErrorAlert('Error al eliminar álbum', 'No se pudo eliminar el álbum.');
            } finally {
                setAlbumIdToDelete(null); // Siempre limpiamos después
            }
        };

        deleteSelectedAlbum();
    }, [albumIdToDelete, reloadAlbums]);

    const triggerDelete = (id: number) => {
        setAlbumIdToDelete(id);
    };

    return { triggerDelete };
};
