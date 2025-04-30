import { AlbumFormData } from '../../Interfaces/AlbumInterface';
import { createAlbum } from '../../services/albumService';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';

export const useAlbumCreate = (
    formData: AlbumFormData,
    resetForm: () => void
) => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAlbum(formData);
            resetForm();
            showSuccessAlert('Album created successfully');
        } catch (error) {
            console.error('Error creating album', error);
            showErrorAlert('Failed to create album');
        }
    };

    return { handleSubmit };
};