import { User } from "../Interfaces/UserInterface";
import { isTokenExpired } from "./tokenUtils";

export const getValidUserOrNull = (user: User | null): User | null => {
    if (!user) return null;
    if (isTokenExpired(user.token)) return null;
    return user;
};
