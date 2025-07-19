import React from 'react';
import { User } from '../../../Interfaces/UserInterface';
import { FaEnvelope, FaCalendarAlt, FaUserShield } from 'react-icons/fa';

const AdminDetails: React.FC<{ user: User }> = ({ user }) => {
  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('es-AR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '-';

  return (
    <section
      className='bg-white rounded-2xl shadow-md border border-gray-200 p-8 max-w-lg mx-auto
      hover:shadow-lg transition-shadow duration-300
      sm:max-w-xl md:max-w-2xl
      '
    >
      <h2 className='text-3xl font-extrabold text-gray-900 mb-4 tracking-tight'>
        {user.name}
      </h2>
      <p className='inline-block px-4 py-1 text-gray-700 font-semibold rounded-full bg-indigo-100 uppercase tracking-wide mb-8'>
        {user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
      </p>

      <div className='flex flex-col gap-6 text-gray-700 text-gray-700 sm:text-lg'>
        {/* Email */}
        <div className='flex items-center gap-4'>
          <FaEnvelope className='text-gray-600 w-6 h-6 shrink-0' />
          <p className='leading-relaxed'>
            <span className='font-semibold text-gray-600'>Email:</span>{' '}
            {user.email}
          </p>
        </div>

        {/* Miembro desde */}
        {user.createdAt && (
          <div className='flex items-center gap-4'>
            <FaCalendarAlt className='text-gray-600 w-6 h-6 shrink-0' />
            <p className='leading-relaxed'>
              <span className='font-semibold text-gray-600'>
                Miembro desde:
              </span>{' '}
              {formatDate(user.createdAt)}
            </p>
          </div>
        )}

        {/* Estado */}
        {user.status && (
          <div className='flex items-center gap-4'>
            <FaUserShield className='text-gray-600 w-6 h-6 shrink-0' />
            <p className='leading-relaxed'>
              <span className='font-semibold text-gray-600'>Estado:</span>{' '}
              <span
                className={`font-semibold ${
                  user.status === 'ACTIVE' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                {user.status === 'ACTIVE' ? 'Activo' : 'Suspendido'}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDetails;
