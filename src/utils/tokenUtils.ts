import { jwtDecode } from "jwt-decode";


export const isTokenExpired = (token: string): boolean => {

    try {
        const decoded: { exp: number } = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
         
            window.location.href = '/';  
            return true;
        }
        return false;
    } catch (e) {
     
        window.location.href = '/'; 
        return true;
        }
    }