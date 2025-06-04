import { useState } from 'react';
import { patchUser } from '../../services/userService';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';
import { User } from '../../Interfaces/UserInterface';


export const useEditUser = (userId: string, onClose: () => void) => {
    const [formData, setFormData] = useState<Partial<User>>({
        username: '',
        email: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await patchUser(userId, formData);
            showSuccessAlert('Usuario actualizado', 'Los cambios se han guardado exitosamente.');
            onClose();
        } catch (error: any) {
            showErrorAlert(error?.response?.data?.message || 'Error al actualizar el usuario',  'Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        loading,
    };
};
