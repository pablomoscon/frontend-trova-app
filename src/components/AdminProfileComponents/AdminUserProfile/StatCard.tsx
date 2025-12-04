import React from 'react';
import { StatCardProps } from '../../../Interfaces/StatsInterfaces';

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <section
    className='p-5 bg-gray-50 rounded-xl shadow-sm text-center flex flex-col justify-center items-center
    hover:shadow-md transition-shadow duration-300'
    aria-labelledby={`${label.replaceAll(' ', '')}-label`}
  >
    <p
      id={`${label.replaceAll(' ', '')}-label`}
      className='text-lg font-medium mb-2 text-gray-800'
    >
      {label}
    </p>
    <p className='text-gray-500 font-extrabold text-3xl'>{value}</p>
  </section>
);

export default StatCard;
