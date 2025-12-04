import { useState, ReactNode, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '../Interfaces/UserInterface';
import { isTokenExpired } from '../utils/tokenUtils';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = localStorage.getItem('user');
  const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;
  const initialUser =
    parsedUser && !isTokenExpired(parsedUser.token) ? parsedUser : null;

  const [user, setUser] = useState<User | null>(initialUser);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'ADMIN';
  const isAuthenticated = !!user && !isTokenExpired(user.token);
  const token = user?.token || null;

  const value = {
    user,
    login,
    logout,
    isAdmin,
    isAuthenticated,
    token,
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

    if (!parsedUser || isTokenExpired(parsedUser.token)) {
      setUser(null);
      localStorage.removeItem('user');
    } else {
      setUser(parsedUser);
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
