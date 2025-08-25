import React from 'react';
import { StatCardProps } from '../../../Interfaces/StatsInterfaces';

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
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
    <p className={`text-gray-500 font-extrabold text-3xl`}>{value}</p>
  </div>
);

export default StatCard;
