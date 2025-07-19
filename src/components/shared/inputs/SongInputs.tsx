import React from 'react';
import { AlbumSongInputsProps } from '../../../Interfaces/AlbumInterface';

const SongInputs: React.FC<AlbumSongInputsProps> = ({
  listOfSongs,
  handleChange,
  isEditMode,
  goToSongsStep,
}) => {
  const updateSong = (
    index: number,
    field: 'title' | 'duration',
    value: string
  ) => {
    const updatedSongs = [...listOfSongs];
    updatedSongs[index][field] = value;
    handleChange({ target: { title: 'listOfSongs', value: updatedSongs } });
  };

  const addSong = () => {
    const last = listOfSongs[listOfSongs.length - 1];
    if (last?.title.trim() && last?.duration.trim()) {
      handleChange({
        target: {
          name: 'listOfSongs',
          value: [...listOfSongs, { name: '', duration: '' }],
        },
      });
    }
  };

  return (
    <div className='col-span-full'>
      <label className='block text-xs sm:text-sm font-medium text-gray-900 text-start'>
        Canciones
      </label>
      {isEditMode ? (
        <button
          type='button'
          onClick={goToSongsStep}
          className='mt-2 btn bg-gray-500 py-2 px-4 text-sm rounded hover:bg-gray-400 text-white '
        >
          Editar Canciones
        </button>
      ) : (
        <>
          {listOfSongs.map((song, i) => (
            <div
              key={i}
              className='flex flex-col sm:flex-row gap-2 mt-2 text-xs sm:text-sm'
            >
              <input
                type='text'
                placeholder='Nombre de la canción'
                value={song.title}
                onChange={(e) => updateSong(i, 'title', e.target.value)}
                className='input sm:w-1/2 border border-gray-300 rounded-md p-2'
              />
              <input
                type='text'
                placeholder='Duración (ej: 3:45)'
                value={song.duration}
                onChange={(e) => updateSong(i, 'duration', e.target.value)}
                className='input sm:w-1/2 border border-gray-300 rounded-md p-2'
              />
            </div>
          ))}
          <button
            type='button'
            onClick={addSong}
            className='mt-8 btn bg-gray-500 py-2 px-4 text-sm rounded hover:bg-gray-400 text-white '
          >
            Agregar canción
          </button>
        </>
      )}
    </div>
  );
};

export default SongInputs;
