import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/auth/useAuthContext';
import { PublicRouteProps } from '../Interfaces/RoutesInterface';

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to='/admin/dashboard' replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
