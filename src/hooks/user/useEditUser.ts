import { useEffect, useState } from 'react';
import { editUser, fetchUserById, } from '../../services/userService';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';
import { User } from '../../Interfaces/UserInterface';
import { ApiError } from '../../types/Error';

export const useEditUser = (userId: string, onClose: () => void) => {
    const [formData, setFormData] = useState<Partial<User>>({
        username: '',
        email: '',
        role: 'USER',
    });
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!userId) return;
        setIsLoading(true);
        fetchUserById(userId)
            .then(user => {
                setFormData({
                    username: user.username,
                    email: user.email,
                    role: user.role,
                });
            })
            .catch(err => {
                showErrorAlert('Error al cargar el usuario', err.message || '');
            })
            .finally(() => setIsLoading(false));
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) return;
        setIsLoading(true);
        try {
            await editUser(userId, formData);
            showSuccessAlert('Usuario actualizado', 'Los cambios se han guardado exitosamente.');
            onClose();
        } catch (error: unknown) {
            const err = error as ApiError;

            showErrorAlert(
                err.response?.data?.message || "Error al actualizar el usuario",
                "Por favor, inténtalo de nuevo."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, handleChange, handleSubmit, isLoading };
};
