import { useContext } from 'react';
import { ScrollContext } from '../../context/ScrollContext';


export const useScrollContext = () => {
  const ctx = useContext(ScrollContext);

  if (!ctx)
    throw new Error('useScrollContext must be used within ScrollProvider');

  return ctx;
};