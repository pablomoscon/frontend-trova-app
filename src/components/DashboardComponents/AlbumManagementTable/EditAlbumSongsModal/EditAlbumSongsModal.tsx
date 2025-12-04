import React, { useRef, useState } from 'react';
import { EditAlbumSongsModalProps } from '../../../../Interfaces/AlbumInterface';
import {
  showErrorAlert,
  showSuccessAlert,
} from '../../../../utils/showAlertUtils';
import { useEditSongs } from '../../../../hooks/song/useEditSongs';
import { useAddSongsToAlbum } from '../../../../hooks/song/useAddSongsToAlbum';
import { useDeleteSongs } from '../../../../hooks/song/useDeleteSong';
import { useCloseOnOutside } from '../../../../hooks/shared/useCloseOnOutside';
import SongsSection from './SongsSection';
import { useFetchAlbumSongs } from '../../../../hooks/song/useFetchAlbumSongs';

const EditAlbumSongsModal: React.FC<
  EditAlbumSongsModalProps & { albumId: number }
> = ({ goBack, albumId }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    songs: fetchedSongs,
    loading: loadingFetch,
    error,
  } = useFetchAlbumSongs(albumId);

  const [selectedSongIds, setSelectedSongIds] = useState<number[]>([]);
  const toggleSongSelection = (id: number) => {
    setSelectedSongIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSuccess = () => {
    showSuccessAlert(
      'Operación exitosa',
      'Las canciones han sido procesadas con éxito.'
    );
    goBack();
  };

  // Usamos el hook actualizado que ya sincroniza editedSongs con fetchedSongs
  const {
    editedSongs,
    handleEditedSongChange,
    saveSongs,
    setEditedSongs,
    loading: loadingEdit,
  } = useEditSongs(fetchedSongs, handleSuccess);

  const {
    newSongs,
    handleNewSongChange,
    addEmptyNewSong,
    addSongs,
    loading: loadingCreate,
  } = useAddSongsToAlbum(albumId, handleSuccess);

  const { deleteSongs, loading: loadingDelete } = useDeleteSongs();

  useCloseOnOutside(modalRef, goBack);

  const onSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSongs();
    } catch {
      showErrorAlert(
        'Error al guardar cambios',
        'No se pudieron actualizar las canciones existentes.'
      );
    }
  };

  const onSubmitCreate = async () => {
    try {
      await addSongs(newSongs);
    } catch {
      showErrorAlert(
        'Error al crear canciones',
        'No se pudieron crear las nuevas canciones.'
      );
    }
  };

  const handleDeleteSong = async (songId: number) => {
    const wasDeleted = await deleteSongs([songId]);
    if (wasDeleted) {
      setEditedSongs((prev) => prev.filter((song) => song.id !== songId));
    }
  };

  const handleDeleteSelectedSongs = async () => {
    if (selectedSongIds.length === 0) return;
    const wasDeleted = await deleteSongs(selectedSongIds);
    if (wasDeleted) {
      setEditedSongs((prev) =>
        prev.filter((song) => !selectedSongIds.includes(song.id!))
      );
      setSelectedSongIds([]);
    }
  };

  const isLoading =
    loadingEdit || loadingCreate || loadingDelete || loadingFetch;

  if (loadingFetch)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40'>
        <p className='text-gray-700'>Cargando canciones...</p>
      </div>
    );

  if (error)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40'>
        <p className='text-red-600'>Error: {error}</p>
      </div>
    );

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40 p-6 sm:p-10'>
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role='dialog' 
        aria-modal='true'
        tabIndex={-1}
        className='bg-white rounded-lg shadow-lg w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl px-6 py-10 sm:py-12 h-auto max-h-[90vh] overflow-y-auto relative'
      >
        <h2 className='text-xl font-semibold mb-4 text-center text-gray-800'>
          Editar Canciones
        </h2>

        <button
          onClick={goBack}
          className='absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-lg'
          disabled={isLoading}
          aria-label='Cerrar modal'
        >
          ✕
        </button>

        <form onSubmit={onSubmitEdit}>
          <SongsSection
            title='Canciones'
            songs={editedSongs}
            selectedSongIds={selectedSongIds}
            toggleSongSelection={toggleSongSelection}
            handleSongChange={handleEditedSongChange}
            handleDeleteSong={handleDeleteSong}
            onSubmit={onSubmitEdit}
            showCheckbox
            showDeleteSelected
            onDeleteSelected={handleDeleteSelectedSongs}
            disabled={loadingEdit || loadingDelete}
            submitButtonText='Guardar canciones'
            checkboxPosition='right'
          />
        </form>

        <SongsSection
          title='Nuevas canciones'
          songs={newSongs}
          handleSongChange={handleNewSongChange}
          addEmptySong={addEmptyNewSong}
          onSubmit={onSubmitCreate}
          showCheckbox={false}
          disabled={loadingCreate}
          submitButtonText='Crear canciones'
        />

        <div className='mt-6 flex justify-center gap-3'>
          <button
            type='button'
            onClick={goBack}
            className='px-3 py-1.5 text-sm text-gray-600 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50'
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAlbumSongsModal;
