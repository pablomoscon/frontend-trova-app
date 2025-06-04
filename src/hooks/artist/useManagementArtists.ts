import { useState, useEffect } from 'react';
import { Artist } from '../../Interfaces/ArtistInterface';
import { editArtist } from '../../services/artistService';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';
import { useDeleteArtist } from './useDeleteArtist';
import { useFetchArtists } from './useFetchArtists';

export const useManagementArtist = () => {
  const { artists, loading: isLoading, error, reloadArtists } = useFetchArtists();
  const { handleDelete: triggerDelete } = useDeleteArtist(reloadArtists);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleCloseModal();
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal]);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = async (artist: Artist) => {
    if (artist.id === undefined) {
      showErrorAlert('Error', 'El artista no tiene un ID válido.');
      return;
    }

    const currentStatus = (artist.status ?? 'ACTIVE');
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

    try {
      await editArtist(artist.id, { status: newStatus });
      showSuccessAlert(
        'Estado actualizado',
        `El artista fue ${newStatus === 'SUSPENDED' ? 'Suspendido' : 'Activado'}.`
      );
      reloadArtists();
    } catch (err) {
      console.error('Error al cambiar estado del artista', err);
      showErrorAlert('Error', 'No se pudo cambiar el estado del artista.');
    }
  };


  const handleEdit = (id: number) => {
    setSelectedArtistId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedArtistId(null);
    setShowModal(false);
    reloadArtists();
  };

  return {
    filteredArtists,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    toggleStatus,
    triggerDelete,
    handleEdit,
    handleCloseModal,
    selectedArtistId,
    showModal,
  };
};
