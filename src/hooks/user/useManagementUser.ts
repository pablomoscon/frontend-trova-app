import { useEffect, useState } from 'react';
import { User } from '../../Interfaces/UserInterface';
import { fetchUsers, deleteUser, patchUser } from '../../services/userService';
import { showErrorAlert, showSuccessAlert, showConfirmationDialog } from '../../utils/showAlertUtils';

export const useManagementUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const reloadUsers = async () => {
        try {
            setIsLoading(true);
            const data = await fetchUsers();
            setUsers(data);
        } catch {
            setError('Error al cargar los usuarios');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleStatus = async (user: User) => {
        const newStatus = (user.status ?? 'ACTIVE') === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        try {
            await patchUser(user.id, { status: newStatus });
            showSuccessAlert(
                'Estado actualizado',
                `El usuario fue ${newStatus === 'SUSPENDED' ? 'suspendido' : 'activado'}.`
            );
            reloadUsers();
        } catch (error) {
            console.error("Error al cambiar estado del usuario", error);
            showErrorAlert("Error", "No se pudo cambiar el estado del usuario.");
        }
    };

    const triggerDelete = async (id: string) => {
        const confirmed = await showConfirmationDialog(
            '¿Estás seguro?',
            'Esta acción eliminará el usuario permanentemente.'
        );

        if (!confirmed) return;

        try {
            await deleteUser(id);
            showSuccessAlert('Usuario eliminado', 'El usuario ha sido eliminado correctamente.');
            reloadUsers();
        } catch (err) {
            showErrorAlert('Error al eliminar usuario', 'No se pudo eliminar el usuario.');
        }
    };

    const handleEdit = (id: string) => {
        setSelectedUserId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUserId(null);
        reloadUsers();
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        reloadUsers();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showModal) {
                handleCloseModal();
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showModal]);

    return {
        filteredUsers,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        selectedUserId,
        showModal,
        handleEdit,
        handleCloseModal,
        triggerDelete,
        toggleStatus,
    };
};
