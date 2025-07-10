import React from 'react';
import { AdminStatsProps } from '../../../Interfaces/AdminProfileInterface';

const colorMap: Record<string, string> = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Sin datos';
  try {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Fecha inválida';
  }
};

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  // Lista dinámica para renderizar las tarjetas
  const statsList = [
    {
      label: 'Último ingreso',
      value: formatDate(stats.lastLogin),
      color: 'blue',
    },
    {
      label: 'Fecha de registro',
      value: formatDate(stats.createdAt),
      color: 'green',
    },
    {
      label: 'Intentos fallidos',
      value: (stats.failedAttempts ?? 0).toString(),
      color: 'purple',
    },
    {
      label: 'Acciones realizadas',
      value: (stats.activities?.length ?? 0).toString(),
      color: 'orange',
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
        {statsList.map(({ label, value, color }) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            color={color as keyof typeof colorMap}
          />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: keyof typeof colorMap;
}) => (
  <div
    className={`p-5 bg-gray-50 rounded-xl shadow-sm text-center flex flex-col justify-center items-center
    hover:shadow-md transition-shadow duration-300`}
    role='region'
    aria-labelledby={`${label.replace(/\s/g, '')}-label`}
  >
    <p
      id={`${label.replace(/\s/g, '')}-label`}
      className='text-lg font-medium mb-2 text-gray-800'
    >
      {label}
    </p>
    <p className={`${colorMap[color]} font-extrabold text-3xl`}>{value}</p>
  </div>
);

export default AdminStats;
