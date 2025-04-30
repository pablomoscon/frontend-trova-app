import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSignupErrorAlert, showSignupSuccessAlert } from '../../utils/showAuthAlertUtils';
import { signUp } from '../../services/authService';


const useSignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        name: '', 
        email: '',
        password: '',
        confirmPassword: '',
    
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signUp({ ...formData });
            const result = await showSignupSuccessAlert();
            if (result.isConfirmed) navigate('/signin');
        } catch (error) {
            console.error('Error registrándose:', error);
            showSignupErrorAlert();
        }
    };

    return { formData, handleChange, handleSubmit };
};

export default useSignUp;
