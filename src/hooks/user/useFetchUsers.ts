import { useCallback, useEffect, useState } from 'react';
import { User, UsersData } from '../../Interfaces/UserInterface';
import { fetchUsers } from '../../services/userService';

export const useFetchUsers = (page: number, size: number) => {
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res: UsersData = await fetchUsers(page, size);
            setUsers(res.content|| []);
            setTotalPages(Math.max(1, res.totalPages));
            setCurrentPage(res.currentPage ?? 0);
            setError(null);
        } catch (e) {
            console.error(e);
            const msg =
                e instanceof Error ? e.message : 'Failed to load users';
            setError(msg);
            setUsers([]);
            setTotalPages(1);
            setCurrentPage(0);
        } finally {
            setIsLoading(false);
        }
    }, [page, size]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return {
        users,
        totalPages,
        isLoading,
        error,
        reloadUsers: loadUsers,
        currentPage
    };
}