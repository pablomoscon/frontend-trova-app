import { useState, useEffect } from 'react';
import { useSessionPage } from './useSessionPage';

export function usePageAndSearch(
    pageKey: string,
    initialSearch = ''
): {
    page: number;
    setPage: (p: number) => void;
    searchTerm: string;
    setSearchTerm: (s: string) => void;
    handleSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
} {
    const [page, setPage] = useSessionPage(pageKey);
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    useEffect(() => {
        const onPopState = () => {
            setSearchTerm('');
            setPage(1);
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, [setPage]);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setPage(1);
        }
    };

    return { page, setPage, searchTerm, setSearchTerm, handleSearchKeyDown };
}
