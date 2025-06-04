import React from 'react';
import { AdminStatsProps } from '../../../Interfaces/AdminProfileInterface';

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => (
  <div className='w-full bg-white rounded-xl shadow-md p-6 space-y-4'>
    <h3 className='text-xl font-semibold text-gray-800 mb-3'>
      Actividad del administrador
    </h3>
    <div className='grid grid-cols-2 gap-4 text-sm text-gray-700'>
      <StatCard
        label='Último ingreso'
        value={
          stats.lastLogin
            ? new Date(stats.lastLogin).toLocaleDateString()
            : 'Sin datos'
        }
        color='blue'
      />
      <StatCard
        label='Fecha de registro'
        value={
          stats.createdAt
            ? new Date(stats.createdAt).toLocaleDateString()
            : 'Desconocido'
        }
        color='green'
      />
      <StatCard
        label='Intentos fallidos'
        value={stats.failedAttempts?.toString() ?? '0'}
        color='purple'
      />
      <StatCard
        label='Acciones realizadas'
        value={String(stats.activities?.length ?? 0)}
        color='orange'
      />
    </div>
  </div>
);

const StatCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <div className='p-4 bg-gray-50 rounded-lg shadow-sm text-center'>
    <p className='text-base font-medium'>{label}</p>
    <p className={`text-${color}-600 font-bold text-xl`}>{value}</p>
  </div>
);

export default AdminStats;
