import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
    const { pathname } = useLocation(); // Desestructuramos directamente el pathname

    useEffect(() => {
        window.scrollTo(0, 0); // Desplazar al inicio
    }, [pathname]); // Solo depende de `pathname`
};

export default useScrollToTop;