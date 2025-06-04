import React from 'react';
import { AlbumGenreSelectorProps } from '../../../Interfaces/AlbumInterface';
import { genresList } from '../../../data/genres';


const GenreSelector: React.FC<AlbumGenreSelectorProps> = ({
  selectedGenres,
  onChange,
}) => {
  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    onChange({ target: { name: 'genres', value: values } });
  };

  return (
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
        value={selectedGenres}
        onChange={handleMultiSelect}
        className='mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 sm:text-sm text-gray-600 text-xs'
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
  );
};

export default GenreSelector;
