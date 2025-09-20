import { useState } from 'react';
import { EmailData } from '../../Interfaces/EmailInterface';
import { sendEmail } from '../../services/emailsService';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';

export const useContactForm = () => {
    const initialForm: EmailData = {
        firstName: '',
        email: '',
        message: '',
        phone: '',
        lastName: '',
    };

    const [form, setForm] = useState<EmailData>(initialForm);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const emailData: EmailData = { ...form };
            const res = await sendEmail(emailData);

            setSuccess(true);
            console.log(res);

            showSuccessAlert(
                '¡Mensaje enviado!',
                'Tu mensaje fue enviado con éxito. Te contactaremos pronto.'
            );

            setForm(initialForm);
        } catch (err: unknown) {
            let errorMessage = 'Error sending message';
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);

            showErrorAlert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        handleChange,
        handleSubmit,
        loading,
        success,
        error,
        setForm,
    };
};
