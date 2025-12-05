import React from 'react';
import { UserCardProps } from '../../../Interfaces/UserInterface';

const UserCard: React.FC<UserCardProps & { onClick?: () => void }> = ({
  user,
  onClick,
}) => {
  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
    user.username || user.email || 'user'
  )}`;

  return (
    <button
      onClick={onClick}
      className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer py-6 px-4 flex flex-col items-center justify-center text-center max-w-sm mx-auto'
      title={user.email}
    >
      <img
        src={avatarUrl}
        alt={`Avatar de ${user.username}`}
        loading='lazy'
        className='w-20 h-20 rounded-full mb-4 object-cover shadow-inner bg-gray-100'
      />
      <h2 className='text-lg font-semibold text-gray-800'>{user.username}</h2>
      <p className='text-gray-500 text-sm'>{user.email}</p>
      <div className='flex justify-between w-full text-xs text-gray-700 mt-4'>
        <div className='flex flex-col items-center flex-1'>
          <span className='text-gray-500'>Rol</span>
          <span className='font-bold'>{user.role}</span>
        </div>
        <div className='flex flex-col items-center flex-1'>
          <span className='text-gray-500'>Estado</span>
          <span className='font-bold'>
            {user.status === 'ACTIVE' ? 'Activo' : 'Suspendido'}
          </span>
        </div>
        <div className='flex flex-col items-center flex-1'>
          <span className='text-gray-500'>Creado</span>
          <span className='font-bold'>
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : 'No disponible'}
          </span>
        </div>
      </div>
    </button>
  );
};

export default UserCard;
