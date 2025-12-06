import React from 'react';
import { AlbumSongInputsProps } from '../../../Interfaces/AlbumInterface';

const SongInputs: React.FC<AlbumSongInputsProps> = ({
  listOfSongs,
  onChange,
  isEditMode,
  goToSongsStep,
}) => {
  const updateSong = (
    index: number,
    field: 'name' | 'duration',
    value: string
  ) => {
    const updatedSongs = [...listOfSongs];
    updatedSongs[index][field] = value;
    onChange({ target: { name: 'listOfSongs', value: updatedSongs } });
  };

  const addSong = () => {
    const last = listOfSongs[listOfSongs.length - 1];
    if (last?.name.trim() && last?.duration.trim()) {
      onChange({
        target: {
          name: 'listOfSongs',
          value: [...listOfSongs, { name: '', duration: '' }],
        },
      });
    }
  };

  return (
    <div className='col-span-full'>
      <p className='block text-xs sm:text-sm font-medium text-gray-900 text-start'>
        Canciones
      </p>
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
          {listOfSongs.map((song) => (
            <div
              key={song.id}
              className='flex flex-col sm:flex-row gap-2 mt-2 text-xs sm:text-sm'
            >
              <input
                type='text'
                placeholder='Nombre de la canción'
                value={song.name}
                onChange={(e) => updateSong(song.id!, 'name', e.target.value)}
                className='input sm:w-1/2 border border-gray-300 rounded-md p-2'
              />
              <input
                type='text'
                placeholder='Duración (ej: 3:45)'
                value={song.duration}
                onChange={(e) => updateSong(song.id!, 'duration', e.target.value)}
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
