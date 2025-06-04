import React from 'react';
import { User } from '../../../Interfaces/UserInterface';

const AdminDetails: React.FC<{ user: User }> = ({ user }) => (
  <div className='w-full bg-white rounded-xl shadow-md p-6 space-y-3'>
    <h2 className='text-2xl font-bold text-gray-800'>{user.name}</h2>
    <p className='text-sm text-blue-600 font-medium capitalize'>{user.role}</p>
    <div className='mt-4 text-gray-700 space-y-1 text-sm'>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.createdAt && (
        <p>
          <strong>Miembro desde:</strong>{' '}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      )}
      {user.status && (
        <p>
          <strong>Estado:</strong>{' '}
          <span
            className={
              user.status === 'ACTIVE'
                ? 'text-green-600 font-semibold'
                : 'text-red-600 font-semibold'
            }
          >
            {user.status === 'ACTIVE' ? 'Activo' : 'Suspendido'}
          </span>
        </p>
      )}
    </div>
  </div>
);

export default AdminDetails;