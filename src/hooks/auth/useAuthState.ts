import { useState, useCallback } from "react";
import { User } from "../../Interfaces/UserInterface";
import { getValidUserOrNull } from "../../utils/validateUserToken";
import { clearUser, loadStoredUser, saveUser } from "../../services/authService";


export const useAuthState = () => {
    const [user, setUser] = useState<User | null>(() =>
        getValidUserOrNull(loadStoredUser())
    );

    const login = useCallback((userData: User) => {
        saveUser(userData);
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        clearUser();
        setUser(null);
    }, []);

    return {
        user,
        login,
        logout,
        setUser,
    };
};
