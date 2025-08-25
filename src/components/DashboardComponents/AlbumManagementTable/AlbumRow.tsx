import React from 'react';
import { AlbumRowProps } from '../../../Interfaces/AlbumInterface';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import ToggleSwitch from '../../Shared/ToggleSwitch';

const AlbumRow: React.FC<AlbumRowProps> = ({
  album,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const isActive = (album.status ?? '').toUpperCase() === 'ACTIVE';

  return (
    <tr className='border-b text-center'>
      <td className='px-3 py-2 text-xs sm:text-sm md:text-base'>
        {album.title}
      </td>
      <td className='px-3 py-2 text-xs sm:text-sm md:text-base'>
        {album.artistName}
      </td>
      <td className='px-3 py-2 flex justify-center'>
        <ToggleSwitch
          enabled={isActive}
          onToggle={() => onToggleStatus(album)}
          ariaLabel={`Cambiar estado de ${album.title}`}
        />
      </td>
      <td className='px-3 py-2'>
        <div className='flex justify-center space-x-3'>
          <button
            onClick={() => album.id && onEdit(album.id)}
            aria-label='Editar álbum'
            className='text-gray-800 hover:text-gray-600 cursor-pointer'
          >
            <PencilIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
          <button
            onClick={() => album.id && onDelete(album.id)}
            aria-label='Eliminar álbum'
            className='text-gray-600 hover:text-gray-400 cursor-pointer'
          >
            <TrashIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AlbumRow;
