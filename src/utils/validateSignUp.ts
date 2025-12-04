import { SignupData, SignupErrors } from "../Interfaces/AuthInterface";

export const validateForm = (formData: SignupData, setErrors: React.Dispatch<React.SetStateAction<SignupErrors>>) => {
    let isValid = true;
    const errorMessages = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    // Validate name (should contain at least first and last name)
    if (!formData.name || formData.name.split(' ').length < 2) {
        errorMessages.name = 'Full name (First and Last) is required';
        isValid = false;
    } else {
        errorMessages.name = '';
    }

    // Validate username (should be at least 6 characters)
    if (!formData.username) {
        errorMessages.username = 'Username is required';
        isValid = false;
    } else if (formData.username.length <= 6) {
        errorMessages.username = 'Username must be at least 7 characters long';
        isValid = false;
    } else {
        errorMessages.username = '';
    }

    // Validate password (must meet special format)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{6,}$/;
    if (!formData.password) {
        errorMessages.password = 'Password is required';
        isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
        errorMessages.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        isValid = false;
    } else {
        errorMessages.password = '';
    }

    // Validate confirm password (should match password)
    if (!formData.confirmPassword) {
        errorMessages.confirmPassword = 'Confirm password is required';
        isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
        errorMessages.confirmPassword = 'Passwords do not match';
        isValid = false;
    } else {
        errorMessages.confirmPassword = '';
    }

    setErrors(errorMessages);
    return isValid;
};
