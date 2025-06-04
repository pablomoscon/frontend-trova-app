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
  const statusNormalized = (user.status ?? 'ACTIVE').toLowerCase();
  const isActive = statusNormalized === 'active';

  return (
    <tr className='border-b text-center'>
      <td className='px-4 py-2'>{user.name}</td>
      <td className='px-4 py-2'>{user.email}</td>
      <td className='px-4 py-2'>{user.role}</td>
      <td className='px-4 py-2'>
        <ToggleSwitch
          enabled={isActive}
          onToggle={() => onToggleStatus(user)}
          ariaLabel={`Cambiar estado de ${user.name}`}
        />
      </td>
      <td className='px-4 py-2'>
        <div className='flex justify-center space-x-4'>
          <button onClick={() => onEdit(user.id)} aria-label='Editar usuario'>
            <PencilIcon className='w-5 h-5 text-gray-800' />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            aria-label='Eliminar usuario'
          >
            <TrashIcon className='w-5 h-5 text-gray-600' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
