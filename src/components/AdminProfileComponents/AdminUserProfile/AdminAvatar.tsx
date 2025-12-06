import React from 'react';
import { UserCog2 } from 'lucide-react';
import { AdminAvatarProps } from '../../../Interfaces/AdminProfileInterface';

const AdminAvatar: React.FC<AdminAvatarProps> = ({ username }) => (
  <div className='absolute left-4 sm:left-10 md:left-16 top-36 sm:top-32 md:top-28 flex flex-col items-center w-24 sm:w-36'>
    <div className='relative w-24 h-24 sm:w-36 sm:h-36 flex-shrink-0'>
      <div className='w-full h-full rounded-full border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center'>
        <UserCog2 className='w-16 h-16 text-gray-500 bg-gray-3' />
      </div>
      <span className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-100 text-gray-800 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 rounded-full shadow'>
        Administrador
      </span>
    </div>
    <h2 className='mt-3 text-xl sm:text-2xl font-bold text-gray-800 text-center leading-tight'>
      {username}
    </h2>
  </div>
);

export default AdminAvatar;
