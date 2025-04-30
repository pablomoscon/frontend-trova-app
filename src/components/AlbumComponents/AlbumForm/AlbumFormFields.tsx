import React from 'react';
import { AlbumFormFieldsProps } from '../../../Interfaces/AlbumInterface';
import { genresList } from '../../../data/genres';

const AlbumFormFields = ({
  formData,
  handleChange,
  artists,
  setShowArtistModal,
  isEditMode,
  goToSongsStep,
}: AlbumFormFieldsProps) => {
  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '__add_new__' && setShowArtistModal) {
      setShowArtistModal(true);
      return;
    }
    handleChange(e);
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    
    handleChange({
      target: { name: 'genres', value: selectedOptions },
    } as unknown as React.ChangeEvent<HTMLSelectElement>); // Si es necesario, hacemos un cast aquí, pero evitando lo innecesario
  };

  return (
    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-4xl mx-auto'>
      {/* Título */}
      <div className='sm:col-span-3'>
        <label
          htmlFor='title'
          className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
        >
          Título del álbum
        </label>
        <input
          type='text'
          name='title'
          id='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Ej: Adios Nonino'
          className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 text-xs sm:text-sm md:text-base text-gray-600'
        />
      </div>

      {/* Artista */}
      <div className='sm:col-span-3'>
        <label
          htmlFor='artist'
          className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
        >
          Artista
        </label>
        <select
          name='artistId'
          id='artist'
          value={formData.artistId}
          onChange={handleArtistChange}
          className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
        >
          <option value=''>Seleccioná un artista</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
          {!isEditMode && (
            <option value='__add_new__'>➕ Agregar nuevo artista</option>
          )}
        </select>
      </div>

      {/* Nombre completo del artista */}
      <div className='sm:col-span-6 flex justify-center'>
        <div className='w-full sm:w-1/2'>
          <label
            htmlFor='displayArtistName'
            className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
          >
            Nombre completo del artista
          </label>
          <input
            type='text'
            name='displayArtistName'
            id='displayArtistName'
            value={formData.displayArtistName}
            onChange={handleChange}
            placeholder='Ej: Piazzolla y su quinteto'
            className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
          />
        </div>
      </div>

      {/* Canciones */}
      <div className='col-span-full'>
        <label
          className={`block text-xs sm:text-sm font-medium text-gray-900 ${
            isEditMode ? 'text-center' : 'text-start'
          }`}
        >
          Canciones
        </label>

        {isEditMode ? (
          <button
            type='button'
            onClick={goToSongsStep}
            className='mt-2 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Editar Canciones
          </button>
        ) : (
          formData.listOfSongs.map(
            (song: { name: string; duration: string }, index: number) => (
              <div key={index} className='flex flex-col sm:flex-row gap-2 mt-2'>
                <div className='flex-1'>
                  <input
                    type='text'
                    placeholder='Nombre de la canción'
                    value={song.name}
                    onChange={(e) => {
                      const newSongs = [...formData.listOfSongs];
                      newSongs[index].name = e.target.value;
                      handleChange({
                        target: { name: 'listOfSongs', value: newSongs },
                      } as any);
                    }}
                    className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
                  />
                </div>

                <div className='flex-1'>
                  <input
                    type='text'
                    placeholder='Duración (ej: 3:45)'
                    value={song.duration}
                    onChange={(e) => {
                      const newSongs = [...formData.listOfSongs];
                      newSongs[index].duration = e.target.value;
                      handleChange({
                        target: { name: 'listOfSongs', value: newSongs },
                      } as any);
                    }}
                    className='mt-2 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
                  />
                </div>
              </div>
            )
          )
        )}

        {!isEditMode && (
          <button
            type='button'
            className='bg-gray-700 text-gray-200 px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-2 md:text-base rounded-md hover:bg-gray-600 mt-6 font-bold'
            onClick={() => {
              const lastSong =
                formData.listOfSongs[formData.listOfSongs.length - 1];
              if (lastSong?.name.trim() && lastSong?.duration.trim()) {
                handleChange({
                  target: {
                    name: 'listOfSongs',
                    value: [
                      ...formData.listOfSongs,
                      { name: '', duration: '' },
                    ],
                  },
                } as any);
              }
            }}
          >
            Agregar canción
          </button>
        )}
      </div>

      {/* Detalles */}
      <div className='col-span-full'>
        <label
          htmlFor='details'
          className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
        >
          Detalles
        </label>
        <textarea
          name='details'
          id='details'
          value={formData.details}
          onChange={handleChange}
          rows={3}
          className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
        />
      </div>

      {/* Géneros */}
      <div className='col-span-full'>
        <label
          htmlFor='genres'
          className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
        >
          Géneros
        </label>
        <select
          multiple
          name='genres'
          id='genres'
          value={formData.genres}
          onChange={handleMultiSelectChange}
          className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
        >
          {genresList.map((genre) => (
            <option key={genre} value={genre}>
              {genre
                .replace(/_/g, ' ')
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {/* Catálogo y Año */}
      <div className='sm:col-span-3'>
        <label
          htmlFor='cdNumber'
          className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
        >
          Número de catálogo
        </label>
        <input
          type='text'
          name='cdNumber'
          id='cdNumber'
          value={formData.cdNumber}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
        />
      </div>

      <div className='sm:col-span-3'>
        <label
          htmlFor='year'
          className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
        >
          Año
        </label>
        <input
          type='number'
          name='year'
          id='year'
          value={formData.year}
          onChange={handleChange}
          placeholder='Ej: 2001'
          className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
        />
      </div>

      {/* Imagen */}
      <div className='col-span-full'>
        <label
          htmlFor='photo'
          className='block text-xs sm:text-sm font-medium text-gray-900 text-start'
        >
          URL de la imagen
        </label>
        <input
          type='text'
          name='photo'
          id='photo'
          value={formData.photo}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
        />
      </div>
    </div>
  );
};

export default AlbumFormFields;
