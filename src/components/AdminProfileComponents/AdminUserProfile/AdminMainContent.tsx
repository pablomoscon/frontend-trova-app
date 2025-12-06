import React from 'react';
import AdminDetails from './AdminDetails';
import AdminStats from './AdminStats';
import { AdminMainContentProps } from '../../../Interfaces/AdminProfileInterface';

const AdminMainContent: React.FC<AdminMainContentProps> = ({ user }) => (
  <div className='max-w-5xl mx-auto pt-40 pb-20 px-4 flex flex-col gap-8'>
    {/* Detalles del administrador */}
    <section className='bg-white rounded-xl shadow-md border border-gray-200 p-6'>
      <h3 className='text-lg font-semibold text-gray-700 mb-4'>
        Detalles del administrador
      </h3>
      <AdminDetails user={user} />
    </section>

    {/* Estadísticas */}
    <section className='bg-white rounded-xl shadow-md border border-gray-200 p-6'>
      <h3 className='text-lg font-semibold text-gray-700 mb-4'>Estadísticas</h3>
      <AdminStats
        stats={{
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
          failedAttempts: user.failedLoginAttempts,
          activities: user.activities ?? [],
        }}
      />
    </section>
  </div>
);

export default AdminMainContent;
