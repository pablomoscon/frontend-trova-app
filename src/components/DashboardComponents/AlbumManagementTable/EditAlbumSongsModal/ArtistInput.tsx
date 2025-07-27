import React from 'react';
import { ArtistInputProps } from '../../../../Interfaces/ArtistInterface';

const ArtistInput: React.FC<ArtistInputProps> = ({
  artistName,
  onChangeArtist,
  disabled,
}) => (
  <div className='mb-4'>
    <label className='block text-base font-semibold font-medium mt-8 mb-4 text-center'>
      Artista
    </label>
    <input
      type='text'
      value={artistName}
      onChange={onChangeArtist}
      placeholder='Nombre del artista'
      className='w-full p-2 border rounded text-sm'
      disabled={disabled}
    />
  </div>
);

export default ArtistInput;
