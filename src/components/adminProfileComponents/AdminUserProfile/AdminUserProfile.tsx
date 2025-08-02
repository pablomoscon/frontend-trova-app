import React from 'react';
import AdminStats from './AdminStats';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import AdminDetails from './AdminDetails';
import Spinner from '../../shared/Spinner';
import { useFetchUserById } from '../../../hooks/user/useFetchUserById';
import { UserCog2 } from 'lucide-react';

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
    return (
      <div className='text-center py-10'>
        <Spinner />
      </div>
    );

  if (!user)
    return (
      <div className='text-center py-10 text-red-500'>
        No se encontró el usuario.
      </div>
    );

  return (
    <div className='min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 py-20'>
      <div className='relative bg-white shadow-md'>
        {/* Portada */}
        <div className='w-full h-60 overflow-hidden'>
          <img
            src='/assets/trova_imagen_user_portada.png'
            alt='Imagen de portada'
            className='w-full h-full object-cover transform filter  brightness-80 contrast-70'
          />
        </div>

        {/* Avatar con nombre debajo */}
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
            {user.username}
          </h2>
        </div>
      </div>

      {/* Contenido principal */}
      <div className='max-w-5xl mx-auto pt-40 pb-20 px-4 flex flex-col gap-8'>
        {/* Detalles del admin */}
        <section className='bg-white rounded-xl shadow-md border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>
            Detalles del administrador
          </h3>
          <AdminDetails user={user} />
        </section>

        {/* Estadísticas */}
        <section className='bg-white rounded-xl shadow-md border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>
            Estadísticas
          </h3>
          <AdminStats
            stats={{
              lastLogin: user.lastLogin,
              createdAt: user.createdAt,
              failedAttempts: user.failedLoginAttempts,
              activities: user.activities ?? [],
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default AdminUserProfile;
