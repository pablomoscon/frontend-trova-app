import React, { useRef, useState } from 'react';
import { EditAlbumSongsModalProps } from '../../../../Interfaces/AlbumInterface';
import { showErrorAlert, showSuccessAlert } from '../../../../utils/showAlertUtils';
import { useEditSongs } from '../../../../hooks/song/useEditSongs';
import { useAddSongsToAlbum } from '../../../../hooks/song/useAddSongsToAlbum';
import { useCloseOnOutside } from '../../../../hooks/shared/useCloseOnOutside';
import { useDeleteSongs } from '../../../../hooks/song/useDeleteSong';
import ArtistInput from './ArtistInput';
import SongsSection from './SongsSection';

const EditAlbumSongsModal: React.FC<
  EditAlbumSongsModalProps & { albumId: number }
> = ({ goBack, songs, albumId }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [artistName, setArtistName] = useState(
    songs.length > 0 ? songs[0].artistName || '' : ''
  );
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

  const {
    editedSongs,
    setEditedSongs,
    handleEditedSongChange,
    saveSongs,
    loading: loadingEdit,
  } = useEditSongs(songs, handleSuccess);

  const {
    newSongs,
    handleNewSongChange,
    addEmptyNewSong,
    addSongs,
    loading: loadingCreate,
  } = useAddSongsToAlbum(albumId, handleSuccess);

  const { deleteSongs, loading: loadingDelete } = useDeleteSongs();

  useCloseOnOutside(modalRef, goBack);

  const onChangeArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

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
      const newSongsWithArtist = newSongs.map((song) => ({
        ...song,
        artistName,
      }));
      await addSongs(newSongsWithArtist);
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

  const isLoading = loadingEdit || loadingCreate || loadingDelete;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40 p-6 sm:p-10'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg shadow-lg w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-3xl p-4 sm:p-6 h-auto max-h-[90vh] overflow-y-auto relative'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl font-semibold mb-4 text-center text-gray-800'>
          Editar Canciones
        </h2>

        <button
          onClick={goBack}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg'
          disabled={isLoading}
          aria-label='Cerrar modal'
        >
          ✕
        </button>

        <ArtistInput
          artistName={artistName}
          onChangeArtist={onChangeArtist}
          disabled={isLoading}
        />

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
