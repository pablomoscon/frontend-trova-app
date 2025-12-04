import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import { showLoginErrorAlert, showLoginSuccessAlert } from '../../utils/showAuthAlertUtils';
import { signIn } from '../../services/authService';
import { Credentials } from '../../Interfaces/AuthInterface';

const useSignIn = ({ username, password }: Credentials) => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const user = await signIn({ username, password });

            if (user.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }
            login(user);
            navigate('/admin/dashboard', { replace: true });
            showLoginSuccessAlert();
        } catch (err) {
            console.error('Error logging in:', err);
            showLoginErrorAlert();
        } finally {
            setLoading(false); 
        }
    };

    return { handleSubmit, loading };
};

export default useSignIn;
