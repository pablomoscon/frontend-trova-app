import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useCloseOnRouteChange = (onClose: () => void) => {
    const location = useLocation();

    useEffect(() => {
        onClose(); 
        
    }, [location.pathname, onClose]);
};
