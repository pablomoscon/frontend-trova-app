import React from 'react';
import { User } from '../../../Interfaces/UserInterface';
import { FaEnvelope, FaCalendarAlt, FaUserShield } from 'react-icons/fa';
import DetailRow from './DetailRow';
import { formatDate } from '../../../utils/formatDateUtils';

const AdminDetails: React.FC<{ user: User }> = ({ user }) => {
  const statusColor =
    user.status === 'ACTIVE' ? 'text-gray-600' : 'text-gray-300';
  const statusLabel = user.status === 'ACTIVE' ? 'Activo' : 'Suspendido';

  return (
    <section
      className='bg-white rounded-2xl shadow-md border border-gray-200 p-8 max-w-lg mx-auto
      hover:shadow-lg transition-shadow duration-300
      sm:max-w-xl md:max-w-2xl'
    >
      <h2 className='text-3xl font-extrabold text-gray-900 mb-4 tracking-tight'>
        {user.name}
      </h2>

      <p className='inline-block px-4 py-1 text-gray-700 font-semibold rounded-full bg-indigo-100 uppercase tracking-wide mb-8'>
        {user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
      </p>

      <div className='flex flex-col gap-6 text-gray-700 sm:text-lg'>
        <DetailRow
          icon={<FaEnvelope className='text-gray-600 w-6 h-6 shrink-0' />}
          value={user.email}
        />

        <DetailRow
          icon={<FaCalendarAlt className='text-gray-600 w-6 h-6 shrink-0' />}
          label='Miembro desde:'
          value={formatDate(user.createdAt)}
        />

        {user.status && (
          <DetailRow
            icon={<FaUserShield className='text-gray-600 w-6 h-6 shrink-0' />}
            label='Estado:'
            value={
              <span className={`font-semibold ${statusColor}`}>
                {statusLabel}
              </span>
            }
          />
        )}
      </div>
    </section>
  );
};

export default AdminDetails;
