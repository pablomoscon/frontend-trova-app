import React from 'react';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';

const DashboardHome: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <div className='flex-1 p-8 bg-[#E5E6E4]'>
      <header className='flex justify-between items-center mb-8 mt-40'>
        <div className='text-3xl font-semibold text-gray-800'>
          Bienvenido, {user?.username}
        </div>
        <div className='flex items-center space-x-4'>
          <div className='text-gray-600'>{user?.username}</div>{' '}
          <div className='h-10 w-10 bg-blue-500 rounded-full'></div>
        </div>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold text-gray-800'>Total Sales</h2>
          <p className='mt-4 text-3xl font-bold text-blue-600'>$3,287</p>
          <div className='mt-4 text-sm text-gray-600'>Since last month</div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold text-gray-800'>Active Users</h2>
          <p className='mt-4 text-3xl font-bold text-green-600'>1,432</p>
          <div className='mt-4 text-sm text-gray-600'>
            User engagement has increased
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold text-gray-800'>Tasks</h2>
          <ul className='mt-4 space-y-2 text-gray-600'>
            <li className='flex justify-between'>
              <span>Design Landing Page</span>
              <span className='text-blue-500'>In Progress</span>
            </li>
            <li className='flex justify-between'>
              <span>Develop API</span>
              <span className='text-green-500'>Completed</span>
            </li>
            <li className='flex justify-between'>
              <span>Write Docs</span>
              <span className='text-yellow-500'>Pending</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
