import React, { useState, useRef } from 'react';
import { EditAlbumSongsModalProps } from '../../../Interfaces/AlbumInterface';
import { Song } from '../../../Interfaces/SongInterface';
import { editSongs } from '../../../services/songsService';
import { showErrorAlert, showSuccessAlert } from '../../../utils/showAlertUtils';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';

const EditAlbumSongsModal: React.FC<EditAlbumSongsModalProps> = ({
  goBack,
  songs,
}) => {
  const [songsData, setSongsData] = useState<Song[]>(songs);
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseOnOutside(modalRef, goBack);

  const handleSongChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setSongsData((prev) =>
      prev.map((song, i) => (i === index ? { ...song, [name]: value } : song))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedSongs = await Promise.all(
        songsData.map((song) => {
          if (song.id !== undefined) {
            return editSongs(song.id, {
              title: song.title,
              duration: song.duration,
            });
          } else {
            console.error('Error: song id is undefined');
            return Promise.reject('Song ID is undefined');
          }
        })
      );
      setSongsData(updatedSongs);

      showSuccessAlert(
        'Canciones actualizadas',
        'Las canciones han sido actualizadas con éxito.'
      );

      window.location.reload();

      goBack();
    } catch (error) {
      console.error('Error updating songs:', error);
      showErrorAlert(
        'Hubo un error al actualizar las canciones.',
        'Inténtalo de nuevo.'
      );
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40 p-20'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 h-auto max-h-[90vh] overflow-y-auto relative'
        onClick={(e) => e.stopPropagation()} // evitar cierre al click dentro
      >
        <button
          onClick={goBack}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>

        <h2 className='text-lg font-semibold mb-4'>
          Editar Canciones del Álbum
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center gap-4 p-5'>
            {songsData.map((song, index) => (
              <div
                key={song.id}
                className='flex items-center w-full max-w-lg gap-2'
              >
                <span className='text-sm font-medium w-6 text-right'>
                  {index + 1})
                </span>

                <input
                  type='text'
                  name='name'
                  value={song.title}
                  onChange={(e) => handleSongChange(e, index)}
                  placeholder='Nombre'
                  className='flex-grow p-1 px-3 border rounded text-sm'
                />

                <input
                  type='text'
                  name='duration'
                  value={song.duration}
                  onChange={(e) => handleSongChange(e, index)}
                  placeholder='Duración'
                  className='w-24 p-1 px-2 border rounded text-sm'
                />
              </div>
            ))}
          </div>

          <div className='mt-6 flex justify-center gap-3'>
            <button
              type='button'
              onClick={goBack}
              className='px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-500'
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAlbumSongsModal;
