import { useCallback } from 'react';
import { editArtist } from '../../services/artistService';
import { showSuccessAlert, showErrorAlert } from '../../utils/showAlertUtils';
import { Artist, ArtistStatus } from '../../Interfaces/ArtistInterface';

export function useToggleArtistStatus(onSuccess: () => void) {
    const toggleStatus = useCallback(
        async (artist: Artist) => {
            const currentStatus: ArtistStatus | null = artist.status ?? null;
            const newStatus: ArtistStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

            try {
                if (!artist.id) {
                    showErrorAlert('Error', 'El artista no tiene ID válido.');
                    return;
                }

                const formData = new FormData();
                formData.append('artist', new Blob([JSON.stringify({ status: newStatus })], { type: 'application/json' }));

                await editArtist(artist.id, formData);

                showSuccessAlert(
                    'Estado actualizado',
                    `El artista fue ${newStatus === 'SUSPENDED' ? 'suspendido' : 'activado'}.`
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
