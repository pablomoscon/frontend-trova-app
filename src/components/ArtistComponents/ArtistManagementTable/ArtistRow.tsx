import React from 'react';
import { ArtistRowProps } from '../../../Interfaces/ArtistInterface';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import ToggleSwitch from '../../shared/ToggleSwitch';

const ArtistRow: React.FC<ArtistRowProps> = ({
  artist,
  onDelete,
  onToggleStatus,
  onEdit,
}) => {
  const statusNormalized = (artist.status ?? 'active').toLowerCase();
  const isActive = statusNormalized === 'active';

  return (
    <tr className='border-b text-center'>
      <td className='px-4 py-2'>{artist.name}</td>
      <td className='px-4 py-2'>{artist.nationality}</td>
      <td className='px-4 py-2'>
        <ToggleSwitch
          enabled={isActive}
          onToggle={() => onToggleStatus(artist)}
          ariaLabel={`Cambiar estado de ${artist.name}`}
        />
      </td>
      <td className='px-4 py-2'>
        <div className='flex justify-center space-x-4'>
          <button
            className='cursor-pointer'
            onClick={() => artist.id != null && onEdit(artist.id)}
            aria-label='Editar artista'
          >
            <PencilIcon className='w-5 h-5 text-gray-800' />
          </button>
          <button
            className='cursor-pointer'
            onClick={() => artist.id != null && onDelete(artist.id)}
            aria-label='Eliminar artista'
          >
            <TrashIcon className='w-5 h-5 text-gray-600' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ArtistRow;
