import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const ARTIST_PREFIX = '/artist';

export function useSessionPage(key: string, routeKey = 'ruta'): [number, (p: number) => void] {
    const { pathname } = useLocation();

    const isSameRouteGroup = (route1: string | null, route2: string): boolean => {
        if (!route1) return false;
        if (route1.startsWith(ARTIST_PREFIX) && route2.startsWith(ARTIST_PREFIX)) return true;
        return route1 === route2;
    };

    const init = (): number => {
        const savedRoute = sessionStorage.getItem(routeKey);
        const rawPage = sessionStorage.getItem(key);

        if (!isSameRouteGroup(savedRoute, pathname)) {
            sessionStorage.removeItem(key);
            sessionStorage.setItem(routeKey, pathname);
            return 1;
        }

        const n = Number(rawPage);
        return Number.isFinite(n) && n > 0 ? n : 1;
    };

    const [page, setPageState] = useState<number>(init);

    useEffect(() => {
        const savedRoute = sessionStorage.getItem(routeKey);
        if (!isSameRouteGroup(savedRoute, pathname)) {
            sessionStorage.removeItem(key);
            sessionStorage.setItem(routeKey, pathname);
            setPageState(1);
        }
    }, [pathname, key, routeKey]);

    const setPage = useCallback(
        (p: number) => {
            const value = Math.max(1, p);
            sessionStorage.setItem(key, String(value));
            setPageState(value);
        },
        [key]
    );

    return [page, setPage];
}
