import React from 'react';
import { AuthLayoutProps } from '../../../Interfaces/AuthInterface';

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className='bg-[#B6B3A4] flex items-center justify-center py-25 mt-20'>
      <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl space-y-8 bg-white p-8 rounded-2xl shadow-md'>
        {title && (
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
