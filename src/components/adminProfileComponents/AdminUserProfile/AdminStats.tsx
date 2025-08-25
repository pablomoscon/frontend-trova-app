import React from 'react';
import { AdminStatsProps } from '../../../Interfaces/AdminProfileInterface';
import { formatDate } from '../../../utils/formatDateUtils';
import StatCard from './StatCard';


const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const statsList = [
    {
      label: 'Último ingreso',
      value: formatDate(stats.lastLogin),
    },
    {
      label: 'Fecha de registro',
      value: formatDate(stats.createdAt),
    },
    {
      label: 'Intentos fallidos',
      value: (stats.failedAttempts ?? 0).toString(),
    },
    {
      label: 'Acciones realizadas',
      value: (stats.activities?.length ?? 0).toString(),
    },
  ];

  return (
    <section
      className='w-full max-w-4xl bg-white rounded-2xl shadow-md p-8 space-y-6
      hover:shadow-lg transition-shadow duration-300'
      aria-label='Estadísticas de actividad del administrador'
    >
      <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
        Actividad del administrador
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700'>
        {statsList.map(({ label, value }) => (
          <StatCard key={label} label={label} value={value} />
        ))}
      </div>
    </section>
  );
};

export default AdminStats;
