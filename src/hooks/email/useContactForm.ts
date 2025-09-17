import { useState } from 'react';
import { EmailData } from '../../Interfaces/EmailInterface';
import { sendEmail } from '../../services/emailsService';

export const useContactForm = () => {
    const [form, setForm] = useState<EmailData>({
        firstName: '',
        email: '',
        message: '',
        phone: '',
        lastName: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
        const emailData: EmailData = { ...form }; // directamente todo el form
        const res = await sendEmail(emailData);
        setSuccess(true);
        console.log(res);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Error sending message');
        }
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
