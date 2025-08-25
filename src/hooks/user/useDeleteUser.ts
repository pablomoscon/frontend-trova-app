import { useState } from 'react';
import {
    showErrorAlert,
    showSuccessAlert,
    showConfirmationDialog,
} from '../../utils/showAlertUtils';
import { editUser } from '../../services/userService';

export const useDeleteUser = (reloadUsers?: () => void) => {
    const [loading, setLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        const confirmed = await showConfirmationDialog(
            '¿Estás seguro?',
            'Esta acción eliminará el usuario permanentemente.'
        );
        if (!confirmed) return;

        try {
            setLoading(true);
            setDeleteError(null);

            await editUser(id, { status: 'DELETED' });

            showSuccessAlert('Usuario eliminado', 'El usuario ha sido eliminado correctamente.');

            if (reloadUsers) {
                await reloadUsers();
            }
        } catch (error: any) {
            console.error('Error al eliminar usuario:', error);
            setDeleteError('Error al eliminar usuario');
            showErrorAlert(
                'Error al eliminar usuario',
                error?.response?.data?.message || error.message || 'No se pudo eliminar el usuario.'
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading, deleteError };
};
