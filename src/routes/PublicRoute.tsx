import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/auth/useAuthContext';


interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>; // envolvemos porque children puede ser múltiple
};

export default PublicRoute;
