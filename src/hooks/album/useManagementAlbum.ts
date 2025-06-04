import { useEffect, useState } from 'react';
import { Album } from '../../Interfaces/AlbumInterface';
import { useDeleteAlbum } from './useDeleteAlbum';
import { editAlbum } from '../../services/albumService';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';
import { sortAlbums } from '../../utils/sortAlbums';
import { useFetchAlbums } from './useFetchAlbum';

export const useManagementAlbum = () => {
    const { albums, isLoading, error, reloadAlbums } = useFetchAlbums();
    const { triggerDelete } = useDeleteAlbum(reloadAlbums);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);

    const filteredAlbums = sortAlbums(albums).filter(album =>
        album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleStatus = async (album: Album) => {
        const newStatus = (album.status ?? 'ACTIVE') === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        try {
            await editAlbum(album.id, { status: newStatus });
            showSuccessAlert("Estado actualizado", `El álbum fue ${newStatus === 'SUSPENDED' ? 'suspendido' : 'activado'}.`);
            reloadAlbums();
        } catch (error) {
            console.error("Error al cambiar estado del álbum", error);
            showErrorAlert("Error", "No se pudo cambiar el estado.");
        }
    };

    const handleEdit = (id: number) => {
        setSelectedAlbumId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedAlbumId(null);
        setShowModal(false);
        reloadAlbums();
    };

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
        filteredAlbums,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        toggleStatus,
        triggerDelete,
        showModal,
        selectedAlbumId,
        handleEdit,
        handleCloseModal,
    };
};
