import { useState, useEffect } from 'react';

const LoadingDots: React.FC = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 350);

    return () => clearInterval(dotInterval);
  }, []);

  return <>{'.'.repeat(dots)}</>; 
};

export default LoadingDots;
