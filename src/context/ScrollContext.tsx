import { createContext } from 'react';
import { ScrollContextInterface } from '../Interfaces/AuthInterface';


export const ScrollContext = createContext<ScrollContextInterface | undefined>(
  undefined
);
