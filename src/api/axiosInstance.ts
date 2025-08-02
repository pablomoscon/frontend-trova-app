import axios from 'axios';
import { showTokenExpiredAlert } from '../utils/showAuthAlertUtils';

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data?.message?.toLowerCase().includes('expired')
        ) {
            showTokenExpiredAlert();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
