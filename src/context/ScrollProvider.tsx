import { useState, ReactNode } from 'react';
import { ScrollContext } from './ScrollContext';

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [localActive, setLocalActive] = useState(false);

  return (
    <ScrollContext.Provider value={{ localActive, setLocalActive }}>
      {children}
    </ScrollContext.Provider>
  );
};
