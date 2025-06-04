import React from 'react';
import { ArtistSelectProps } from '../../../Interfaces/ArtistInterface';

const ArtistSelect: React.FC<ArtistSelectProps> = ({
  artistId,
  artists,
  onChange,
  setShowArtistModal,
  isEditMode,
}) => {
  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '__add_new__' && setShowArtistModal) {
      setShowArtistModal(true);
      return;
    }
    onChange(e);
  };

  return (
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
        value={artistId}
        onChange={handleArtistChange}
        className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3 sm:text-sm text-gray-600 text-xs'
      >
        <option value=''>Seleccioná un artista</option>
        {artists.map((artist) => (
          <option key={artist.id} value={artist.id?.toString()}>
            {artist.name}
          </option>
        ))}
        {!isEditMode && (
          <option value='__add_new__'>➕ Agregar nuevo artista</option>
        )}
      </select>
    </div>
  );
};

export default ArtistSelect;
