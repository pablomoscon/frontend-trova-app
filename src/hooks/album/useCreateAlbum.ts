import { useState } from 'react';
import { createAlbum } from '../../services/albumService';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';
import { useAlbumForm } from './useAlbumForm';

export const useCreateAlbum = () => {
    const {
        formData,
        handleChange,
        handleFileChange,
        resetForm,
        songsInput,
        setSongsInput,
        imagePreview,
    } = useAlbumForm();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            const { photo, ...albumData } = formData;
            formDataToSend.append('album', JSON.stringify(albumData));

            if (photo instanceof File) {
                formDataToSend.append('photo', photo);
            }

            await createAlbum(formDataToSend);
            resetForm();
            showSuccessAlert('Álbum creado', 'El álbum se guardó exitosamente.');
        } catch (error) {
            console.error('Error creating album', error);
            showErrorAlert('Error al crear el álbum', 'Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleFileChange,
        resetForm,
        songsInput,
        setSongsInput,
        imagePreview,
        handleSubmit,
        isLoading,
    };
};
