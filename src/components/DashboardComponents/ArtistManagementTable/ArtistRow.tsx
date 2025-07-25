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
  const isActive = (artist.status ?? '').toUpperCase() === 'ACTIVE';

  return (
    <tr className='border-b text-left'>
      <td className='px-3 py-2 text-xs sm:text-sm md:text-base'>
        {artist.name}
      </td>
      <td className='px-3 py-2 text-xs sm:text-sm md:text-base'>
        {artist.nationality}
      </td>
      <td className='px-3 py-2 flex justify-center'>
        <ToggleSwitch
          enabled={isActive}
          onToggle={() => onToggleStatus(artist)}
          ariaLabel={`Cambiar estado de ${artist.name}`}
        />
      </td>
      <td className='px-3 py-2'>
        <div className='flex justify-start space-x-3'>
          <button
            onClick={() => artist.id != null && onEdit(artist.id)}
            aria-label='Editar artista'
            className='text-gray-800 hover:text-gray-600'
          >
            <PencilIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
          <button
            onClick={() => artist.id != null && onDelete(artist.id)}
            aria-label='Eliminar artista'
            className='text-gray-600 hover:text-gray-400'
          >
            <TrashIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ArtistRow;
