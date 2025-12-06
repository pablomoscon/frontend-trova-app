import React from 'react';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useFetchUserById } from '../../../hooks/user/useFetchUserById';
import Spinner from '../../Shared/Spinner';
import AdminCoverImage from './AdminCoverImage';
import AdminAvatar from './AdminAvatar';
import AdminErrorMessage from './AdminErrorMessage';
import AdminMainContent from './AdminMainContent';

const AdminUserProfile: React.FC = () => {
  const { user: authUser } = useAuthContext();
  const adminId = authUser?.id;
  const { user, loading } = useFetchUserById(adminId || '');

  if (!adminId)
    return (
      <AdminErrorMessage message='No se pudo determinar el perfil del administrador.' />
    );
  if (loading) return <Spinner />;
  if (!user) return <AdminErrorMessage message='No se encontró el usuario.' />;

  return (
    <div className='min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 py-20'>
      <div className='relative bg-white shadow-md'>
        <AdminCoverImage
          src='/assets/trova_imagen_user_portada.webp'
          placeholder='/assets/logo_portada_placeholder.webp'
          alt='Imagen de portada'
        />
        <AdminAvatar username={user.username} />
      </div>

      <AdminMainContent user={user} />
    </div>
  );
};

export default AdminUserProfile;
