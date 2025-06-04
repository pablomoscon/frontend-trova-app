import { useEffect, useState } from 'react';
import { User } from '../../Interfaces/UserInterface';
import { fetchUserById, fetchUsers } from '../../services/userService';

export const useFetchUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { users, loading };
};

export const useFetchUserById = (id: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchUserById(id); // 👈 ya no destructures
                setUser(data);
            } catch (error) {
                console.error('Error fetching user by id:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) load();
    }, [id]);

    return { user, loading };
};
