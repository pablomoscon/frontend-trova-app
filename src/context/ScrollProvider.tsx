import { useState, useMemo, ReactNode } from 'react';
import { ScrollContext } from './ScrollContext';

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [localActive, setLocalActive] = useState(false);

  // Memorizar value para evitar recreación en cada render
  const value = useMemo(
    () => ({ localActive, setLocalActive }),
    [localActive] // solo cambia si cambia el estado
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};
