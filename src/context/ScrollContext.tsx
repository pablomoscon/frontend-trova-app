import { createContext, useContext, useState, ReactNode } from 'react';

interface ScrollContextType {
  localActive: boolean;
  setLocalActive: (state: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [localActive, setLocalActive] = useState(false);
  return (
    <ScrollContext.Provider value={{ localActive, setLocalActive }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const ctx = useContext(ScrollContext);
  if (!ctx)
    throw new Error('useScrollContext must be used within ScrollProvider');
  return ctx;
};
