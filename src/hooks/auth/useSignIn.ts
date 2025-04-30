import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import { showLoginErrorAlert, showLoginSuccessAlert } from '../../utils/showAuthAlertUtils';
import { signIn } from '../../services/authService';
import { Credentials } from '../../Interfaces/AuthInterface';


const useSignIn = ({ username, password }: Credentials) => {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await signIn({ username, password });
            login(user);
            const result = await showLoginSuccessAlert();
            if (result.isConfirmed) navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            showLoginErrorAlert();
        }
    };

    return handleSubmit;
};

export default useSignIn;
