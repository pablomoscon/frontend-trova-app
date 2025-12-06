import React from 'react';
import SongField from './SongField';
import { Song, SongRowProps } from '../../../../Interfaces/SongInterface';

const SongRow: React.FC<SongRowProps> = ({ song, index, onUpdate }) => {
  return (
    <div className='flex flex-col sm:flex-row gap-2 mt-2 text-xs sm:text-sm'>
      <SongField
        value={song.name}
        placeholder='Nombre de la canción'
        onChange={(v) => onUpdate(index, 'name', v)}
      />

      <SongField
        value={song.duration}
        placeholder='Duración (ej: 3:45)'
        onChange={(v) => onUpdate(index, 'duration', v)}
      />
    </div>
  );
};

export default SongRow;
