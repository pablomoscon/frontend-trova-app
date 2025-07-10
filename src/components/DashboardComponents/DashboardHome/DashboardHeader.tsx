import React from 'react';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';

const DashboardHeader: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <header className='flex justify-between items-center mb-12 mt-32'>
      <h1 className='text-4xl font-bold text-gray-800'>Dashboard</h1>
      <div className='flex items-center gap-4'>
        <span className='text-gray-600'>{user?.username}</span>
        <div className='h-10 w-10 bg-blue-500 rounded-full'></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
