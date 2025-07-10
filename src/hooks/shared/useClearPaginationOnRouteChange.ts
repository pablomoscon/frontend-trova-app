import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_KEY = 'ruta';
const ARTIST_PREFIX = '/artist';

export function useClearSessionStorageOnRouteChange() {
    const { pathname } = useLocation();

    useEffect(() => {
        const savedRoute = sessionStorage.getItem(ROUTE_KEY);
        const savedIsArtist = savedRoute?.startsWith(ARTIST_PREFIX);
        const currentIsArtist = pathname.startsWith(ARTIST_PREFIX);

        if (savedRoute !== pathname && !(savedIsArtist && currentIsArtist)) {
            sessionStorage.clear();
        }
        sessionStorage.setItem(ROUTE_KEY, pathname);
    }, [pathname]);
}
