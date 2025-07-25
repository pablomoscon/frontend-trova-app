import React from 'react';
import { DashboardSummaryCardProps } from '../../../Interfaces/DashboardInterface';

const SummaryCard: React.FC<DashboardSummaryCardProps> = ({
  title,
  value,
  note,
  color,
}) => (
  <div className='bg-white p-4 sm:p-6 rounded-lg shadow-md'>
    <h2 className='text-lg sm:text-xl font-semibold text-gray-800'>{title}</h2>
    <p className={`mt-3 text-2xl sm:text-3xl font-bold text-${color}-600`}>
      {value ?? '-'}
    </p>
    {note && (
      <div className='mt-2 text-xs sm:text-sm text-gray-600'>{note}</div>
    )}
  </div>
);

export default SummaryCard;