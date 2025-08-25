import { useState, useCallback, useEffect } from 'react';
import { SearchUsersProps, User } from '../../Interfaces/UserInterface';
import { searchUsers } from '../../services/userService';
import { showErrorAlert } from '../../utils/showAlertUtils';

export const useSearchUsers = (query: string,
    page: number,
    pageSize: number
): SearchUsersProps => {
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        if (query.trim() === '') {
            setUsers([]);
            setTotalPages(0);
            setCurrentPage(0);
            setError(null);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const res = await searchUsers(query.trim(), page, pageSize);
            setUsers(res.content);
            setTotalPages(Math.max(1, res.totalPages));
            setCurrentPage(res.currentPage ?? 0);
            setError(null);
        } catch (e) {
            console.error(e);
            setUsers([]);
            setTotalPages(0);
            setCurrentPage(0);
            setError('No se pudo buscar álbumes');
            showErrorAlert('Error', 'No se pudo buscar álbumes');
        } finally {
            setIsLoading(false);
        }
    }, [query, page, pageSize]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return {
        content: users,
        isLoading,
        error,
        totalPages,
        currentPage,
        refresh: fetch
    };
};