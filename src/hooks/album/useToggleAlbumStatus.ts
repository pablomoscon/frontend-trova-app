import { useCallback } from 'react';
import { editAlbum } from '../../services/albumService';
import { showSuccessAlert, showErrorAlert } from '../../utils/showAlertUtils';

export function useToggleAlbumStatus(onSuccess: () => void) {
    const toggleStatus = useCallback(
        async (albumId: number, currentStatus: 'ACTIVE' | 'SUSPENDED' | null) => {
            const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

            try {
                await editAlbum(albumId, { status: newStatus });
                showSuccessAlert(
                    'Estado actualizado',
                    `El álbum fue ${newStatus === 'SUSPENDED' ? 'suspendido' : 'activado'}.`
                );
                onSuccess();
            } catch {
                showErrorAlert('Error', 'No se pudo cambiar el estado.');
            }
        },
        [onSuccess]
    );

    return { toggleStatus };
}
