import { useEffect, useState } from "react";
import { fetchUserById } from "../../services/userService";
import { User } from "../../Interfaces/UserInterface";

export const useFetchUserById = (id: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false); // Empieza en false

    useEffect(() => {
        if (!id) {
            setUser(null);
            setLoading(false);
            return;
        }

        const load = async () => {
            setLoading(true);  // Solo seteo loading en true cuando empiezo a cargar
            try {
                const data = await fetchUserById(id);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user by id:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    return { user, loading };
};
