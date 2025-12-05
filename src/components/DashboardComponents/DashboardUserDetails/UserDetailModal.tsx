import React, { useState, useRef } from 'react';
import { UserDetailModalProps } from '../../../Interfaces/UserInterface';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  const [showAllActivities, setShowAllActivities] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseOnOutside(modalRef, onClose);

  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
    user.username || user.email || 'user'
  )}`;

  const activities = user.activities || [];
  const displayedActivities = showAllActivities
    ? activities
    : activities.slice(0, 3);

  return (
    <div className='fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50 px-2'>
      <div
        ref={modalRef}
        className='bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-gray-200'
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-400 hover:text-black text-2xl'
          aria-label='Cerrar modal'
        >
          ×
        </button>

        <div className='flex flex-col items-center mb-6'>
          <img
            src={avatarUrl}
            alt={`Avatar de ${user.username}`}
            loading='lazy'
            className='w-24 h-24 rounded-full mb-4 object-cover shadow bg-gray-100'
          />
          <h2 className='text-2xl font-bold text-gray-800'>{user.name}</h2>
          <p className='text-gray-500'>{user.email}</p>
        </div>

        <div className='space-y-4 text-sm text-gray-700'>
          <p>
            <strong className='text-gray-600'>Username:</strong> {user.username}
          </p>
          <p>
            <strong className='text-gray-600'>Último acceso:</strong>{' '}
            {user.lastLogin
              ? new Date(user.lastLogin).toLocaleString('es-AR')
              : 'No disponible'}
          </p>
          <p>
            <strong className='text-gray-600'>Intentos fallidos:</strong>{' '}
            {user.failedLoginAttempts}
          </p>

          <div>
            <strong className='text-gray-600'>Actividades recientes:</strong>
            <ul className='list-disc list-inside pl-2 mt-1 max-h-60 overflow-y-auto pr-2'>
              {displayedActivities.length > 0 ? (
                displayedActivities.map((act) => <li key={act}>{act}</li>)
              ) : (
                <li>No disponible</li>
              )}
            </ul>
            {activities.length > 10 && (
              <button
                onClick={() => setShowAllActivities(!showAllActivities)}
                className='mt-2 text-blue-600 hover:underline text-sm'
              >
                {showAllActivities ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
