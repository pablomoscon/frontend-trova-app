import React from 'react';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';

const DashboardHeader: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <header className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 mt-20 sm:mt-32 px-2 sm:px-0'>
      <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
        Dashboard
      </h1>
      <div className='flex items-center gap-4'>
        <span className='text-gray-600 text-sm sm:text-base'>
          {user?.username}
        </span>
        <div className='h-9 w-9 sm:h-10 sm:w-10 bg-blue-500 rounded-full'></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
