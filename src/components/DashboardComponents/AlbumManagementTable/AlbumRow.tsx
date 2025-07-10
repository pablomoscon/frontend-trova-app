import React from 'react';
import { AlbumRowProps } from '../../../Interfaces/AlbumInterface';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import ToggleSwitch from '../../shared/ToggleSwitch';

const AlbumRow: React.FC<AlbumRowProps> = ({
  album,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  
  const isActive = (album.status ?? '').toUpperCase() === 'ACTIVE';
  
  return (
    <tr key={album.id} className='border-b text-center'>
      <td className='px-4 py-2'>{album.title}</td>
      <td className='px-4 py-2'>{album.artistName}</td>
      <td className='px-4 py-2'>
        <ToggleSwitch
          enabled={isActive}
          onToggle={() => onToggleStatus(album)}
          ariaLabel={`Cambiar estado de ${album.title}`}
        />
      </td>
      <td className='px-4 py-2'>
        <div className='flex justify-center space-x-4'>
          <button className='cursor-pointer'
            onClick={() => album.id && onEdit(album.id)}
            aria-label='Editar álbum'
          >
            <PencilIcon className='w-5 h-5 text-gray-800' />
          </button>
          <button className='cursor-pointer'
            onClick={() => album.id && onDelete(album.id)}
            aria-label='Eliminar álbum'
          >
            <TrashIcon className='w-5 h-5 text-gray-600' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AlbumRow;
