import { ReactNode, useMemo, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthState } from '../hooks/auth/useAuthState';
import { selectIsAdmin, selectIsAuthenticated, selectToken } from '../utils/authSelectors';
import { loadStoredUser } from '../services/authService';
import { getValidUserOrNull } from '../utils/validateUserToken';


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, login, logout, setUser } = useAuthState();

  // valores derivados
  const token = selectToken(user);
  const isAdmin = selectIsAdmin(user);
  const isAuthenticated = selectIsAuthenticated(user);

  // valor memoizado del context
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      token,
      isAdmin,
      isAuthenticated,
    }),
    [user, login, logout, token, isAdmin, isAuthenticated]
  );

  // sincronización inicial con localStorage
  useEffect(() => {
    const storedUser = loadStoredUser();
    const validUser = getValidUserOrNull(storedUser);
    setUser(validUser);
  }, [setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
