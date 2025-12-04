import { createContext} from 'react';
import { AuthContextType } from '../Interfaces/AuthInterface';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
