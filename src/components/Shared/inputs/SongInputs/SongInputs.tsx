import React from 'react';
import SongRow from './SongRow';
import { AlbumSongInputsProps } from '../../../../Interfaces/AlbumInterface';

const SongInputs: React.FC<AlbumSongInputsProps> = ({
  listOfSongs,
  onChange,
  isEditMode,
  goToSongsStep,
}) => {
  const update = (index: number, field: 'name' | 'duration', value: string) => {
    const updated = [...listOfSongs];
    updated[index][field] = value;

    onChange({
      target: { name: 'listOfSongs', value: updated },
    });
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
          className='mt-2 btn bg-gray-500 py-2 px-4 text-sm rounded hover:bg-gray-400 text-white'
        >
          Editar Canciones
        </button>
      ) : (
        <>
          {listOfSongs.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              index={index}
              onUpdate={update}
            />
          ))}

          <button
            type='button'
            onClick={addSong}
            className='mt-8 btn bg-gray-500 py-2 px-4 text-sm rounded hover:bg-gray-400 text-white'
          >
            Agregar canción
          </button>
        </>
      )}
    </div>
  );
};

export default SongInputs;
