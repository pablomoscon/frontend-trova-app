import { useCallback } from 'react';
import { editAlbum } from '../../services/albumService';
import { showSuccessAlert, showErrorAlert } from '../../utils/showAlertUtils';
import { Album, Status } from '../../Interfaces/AlbumInterface';

export function useToggleAlbumStatus(onSuccess: () => void) {
    const toggleStatus = useCallback(
        async (album: Album) => {
            const currentStatus: Status | null = album.status ?? null;
            const newStatus: Status = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

            try {
                await editAlbum(album.id, { status: newStatus });
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
