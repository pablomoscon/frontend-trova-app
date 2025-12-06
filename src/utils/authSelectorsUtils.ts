import { User } from "../Interfaces/UserInterface";
import { isTokenExpired } from "../utils/tokenUtils";

export const selectToken = (user: User | null) => user?.token ?? null;

export const selectIsAdmin = (user: User | null) => user?.role === "ADMIN";

export const selectIsAuthenticated = (user: User | null) => {
    if (!user) return false;
    return !isTokenExpired(user.token);
};
