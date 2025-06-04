import React from 'react';
import AdminStats from './AdminStats';
import { useFetchUserById } from '../../../hooks/user/useFetchUsers';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import AdminDetails from './AdminDetails';
import Spinner from '../../shared/Spinner';

const AdminUserProfile: React.FC = () => {
  const { user: authUser } = useAuthContext();
  const adminId = authUser?.id;
  const { user, loading } = useFetchUserById(adminId || '');

  if (!adminId)
    return (
      <div className='text-center py-10 text-red-500'>
        No se pudo determinar el perfil del administrador.
      </div>
    );
  if (loading)
    return <div className='text-center py-10'><Spinner/></div>;
  if (!user)
    return (
      <div className='text-center py-10 text-red-500'>
        No se encontró el usuario.
      </div>
    );

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-white pb-20'>
      <div className='relative'>
        <img
          src='https://via.placeholder.com/1200x200.png?text=Perfil+Administrador'
          alt='Cover'
          className='w-full h-52 object-cover shadow-md'
        />
        <div className='absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-20 md:translate-x-0'>
          <img
            src={
              user.name
                ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=random&size=128`
                : '/default-admin-avatar.png'
            }
            alt='Admin Avatar'
            className='w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover bg-white'
          />
        </div>
      </div>

      <div className='mt-24 max-w-6xl mx-auto px-6 space-y-12'>
        <div className='flex flex-col gap-10'>
          <AdminDetails user={user} />
          <AdminStats
            stats={{
              lastLogin: user.lastLogin,
              createdAt: user.createdAt,
              failedAttempts: user.failedLoginAttempts,
              activities: user.activities ?? [],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;
