import React from 'react';
import { UserRowProps } from '../../../Interfaces/UserInterface';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import ToggleSwitch from '../../shared/ToggleSwitch';

const UserRow: React.FC<UserRowProps> = ({
  user,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const isActive = (user.status ?? '').toUpperCase() === 'ACTIVE';

  return (
    <tr className='border-b text-center'>
      <td
        className='px-2 py-2 max-w-[60px] sm:max-w-none truncate overflow-hidden whitespace-nowrap text-center text-xs sm:text-sm md:text-base'
        title={user.name}
      >
        {user.name}
      </td>
      <td
        className='px-2 py-2 max-w-[60px] sm:max-w-none truncate overflow-hidden whitespace-nowrap text-xs sm:text-sm md:text-base'
        title={user.email}
      >
        {user.email}
      </td>
      <td className='px-2 py-2 text-xs sm:text-sm md:text-base'>{user.role}</td>
      <td className='px-2 py-2'>
        <div className='flex justify-center'>
          <ToggleSwitch
            enabled={isActive}
            onToggle={() => onToggleStatus(user)}
            ariaLabel={`Cambiar estado de ${user.name}`}
          />
        </div>
      </td>
      <td className='px-2 py-2 text-center'>
        <div className='flex justify-center space-x-3'>
          <button
            onClick={() => onEdit(user.id)}
            aria-label='Editar usuario'
            className='text-gray-800 hover:text-gray-600'
          >
            <PencilIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            aria-label='Eliminar usuario'
            className='text-gray-600 hover:text-gray-400'
          >
            <TrashIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
