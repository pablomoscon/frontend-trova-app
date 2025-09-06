import React from 'react';
import { SongsSectionProps } from '../../../../Interfaces/SongInterface';

const SongsSection: React.FC<
  SongsSectionProps & { checkboxPosition?: 'left' | 'right' }
> = ({
  title,
  songs,
  selectedSongIds = [],
  toggleSongSelection = () => {},
  handleSongChange,
  onSubmit,
  addEmptySong,
  showCheckbox,
  showDeleteSelected,
  onDeleteSelected,
  disabled,
  submitButtonText,
  checkboxPosition = 'right',
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}
    className='w-full max-w-4xl mx-auto px-8'
  >
    <h3 className='text-base font-semibold font-medium mt-8 mb-4 text-center text-gray-800'>
      {title}
    </h3>

    <div className='flex flex-col gap-3 p-4 border rounded-lg shadow-sm bg-gray-50'>
      {songs.map((song, index) => (
        <div
          key={song.id ?? `new-${index}`}
          className='flex items-center gap-3 w-full bg-white rounded-md p-2 shadow-sm hover:shadow-md transition-shadow'
        >
          <span className='text-sm font-medium w-6 text-right text-gray-700 select-none'>
            {index + 1})
          </span>

          <input
            type='text'
            value={song.name}
            onChange={(e) => handleSongChange(index, 'name', e.target.value)}
            className='flex-grow p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Nombre'
            disabled={disabled}
          />
          <input
            type='text'
            value={song.duration}
            onChange={(e) =>
              handleSongChange(index, 'duration', e.target.value)
            }
            className='w-24 p-2 border border-gray-300 rounded-md text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Duración'
            disabled={disabled}
          />

          {showCheckbox && checkboxPosition === 'right' && (
            <input
              type='checkbox'
              checked={selectedSongIds.includes(song.id!)}
              onChange={() => toggleSongSelection(song.id!)}
              disabled={disabled}
              className='form-checkbox h-5 w-5 ml-auto cursor-pointer'
              title='Seleccionar canción'
            />
          )}
        </div>
      ))}
    </div>

    <div className='flex flex-col items-center gap-3 mt-6'>
      {addEmptySong && (
        <button
          type='button'
          onClick={addEmptySong}
          disabled={disabled}
          className='w-64 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm'
        >
          + Agregar canción
        </button>
      )}

      <button
        type='submit'
        disabled={disabled}
        className='w-64 py-2 px-4 bg-gray-500 text-gray-50 rounded-md hover:bg-gray-600 text-sm'
      >
        {submitButtonText}
      </button>

      {showDeleteSelected && onDeleteSelected && (
        <button
          type='button'
          onClick={onDeleteSelected}
          disabled={disabled}
          className='w-64 py-2 bg-rose-600 text-gray-100 rounded-md hover:bg-rose-700 text-sm'
        >
          Eliminar Canciones
        </button>
      )}
    </div>
  </form>
);

export default SongsSection;