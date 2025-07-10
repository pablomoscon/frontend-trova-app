import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/auth/useAuthContext';

interface Props {
  children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to='/sign-in' replace />;
  if (user.role !== 'ADMIN') return <Navigate to='/' replace />;

  return <>{children}</>;
};

export default AdminRoute;
