import { useState } from 'react';
import { showErrorAlert } from '../../utils/showAlertUtils';


export function useSearchInput(minChars = 3) {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleEnter = () => {
        if (inputValue.trim().length < minChars) {
            showErrorAlert(
                'Búsqueda inválida',
                `Ingresá al menos ${minChars} caracteres para buscar.`
            );
            return false;
        }
        setQuery(inputValue.trim());
        return true;
    };

    return { inputValue, query, handleInputChange, handleEnter };
}
