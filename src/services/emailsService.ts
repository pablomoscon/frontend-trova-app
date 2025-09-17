import axios from 'axios';
import { EmailData } from '../Interfaces/EmailInterface';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const sendEmail = async (data: EmailData) => {
    try {
        const response = await axios.post(`${baseURL}/email`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data || error.message);
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred while sending email');
        }
    }
};
