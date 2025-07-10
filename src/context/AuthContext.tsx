import { createContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType } from '../Interfaces/AuthInterface';
import { User } from '../Interfaces/UserInterface';
import { isTokenExpired } from '../utils/tokenUtils';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Check if there is a user stored in localStorage and set it to the user state
  const storedUser = localStorage.getItem('user');
  const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  const initialUser =
    parsedUser && !isTokenExpired(parsedUser.token) ? parsedUser : null;

  const [user, setUser] = useState<User | null>(initialUser);

  const login = (userData: User) => {
    // Store the user data in localStorage when logging in
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Remove the user data from localStorage when logging out
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
