import { useState, useEffect } from 'react';
import { deleteAlbum } from '../../services/albumService';
import { showDeleteConfirmation, showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';

export const useDeleteAlbum = (reloadAlbums: () => void) => {
    const [albumIdToDelete, setAlbumIdToDelete] = useState<number | null>(null);

    useEffect(() => {
        const deleteSelectedAlbum = async () => {
            if (albumIdToDelete === null) return;

            const confirmed = await showDeleteConfirmation();
            if (!confirmed) {
                setAlbumIdToDelete(null);
                return;
            }

            try {
                await deleteAlbum(albumIdToDelete);
                showSuccessAlert('Álbum eliminado con éxito');
                reloadAlbums();
            } catch (error) {
                showErrorAlert('Error al eliminar álbum');
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
