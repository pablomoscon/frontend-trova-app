import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';
import { User } from '../../Interfaces/UserInterface';
import { useState } from 'react';
import { editUser } from '../../services/userService';

export const useToggleUserStatus = () => {
    const [loading, setLoading] = useState(false);

    const toggleStatus = async (user: User) => {
        setLoading(true);
        try {
            const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
            await editUser(user.id, { status: newStatus });
            showSuccessAlert(
                'Estado actualizado',
                `Usuario ${newStatus === 'ACTIVE' ? 'activado' : 'suspendido'} correctamente.`
            );
        } catch (err) {
            console.log(err)
            showErrorAlert('Error', 'No se pudo cambiar el estado del usuario.');
        } finally {
            setLoading(false);
        }
    };

    return { toggleStatus, loading };
};
