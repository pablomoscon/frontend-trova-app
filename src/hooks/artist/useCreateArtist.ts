import { useState } from 'react';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';
import { Artist, ArtistFormData } from '../../Interfaces/ArtistInterface';

export const useCreateArtist = (
    addNewArtist: (data: FormData) => Promise<Artist>,  
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showArtistModal, setShowArtistModal] = useState(false);
    const [newArtistFormData, setNewArtistFormData] = useState<ArtistFormData>({
        name: '',
        details: '',
        nationality: '',
        photo: undefined,
    });
    const [createError, setCreateError] = useState<null | string>(null);

    const handleAddArtist = async () => {
        if (!newArtistFormData.name.trim()) return;

        setIsLoading(true);
        try {
            setCreateError(null);

            const formDataToSend = new FormData();
            const artistJson = JSON.stringify({
                name: newArtistFormData.name,
                details: newArtistFormData.details,
                nationality: newArtistFormData.nationality,
            });

            formDataToSend.append('artist', artistJson);

            if (newArtistFormData.photo) {
                formDataToSend.append('photo', newArtistFormData.photo);
            }

            const newArtist = await addNewArtist(formDataToSend);

            if (handleChange) {
                handleChange({
                    target: { name: 'artist', value: newArtist.id || '' },
                } as React.ChangeEvent<HTMLInputElement>);
            }

            setShowArtistModal(false);
            setNewArtistFormData({
                name: '',
                details: '',
                nationality: '',
                photo: undefined,
            });

            showSuccessAlert('Artista creado', 'El artista se guardó exitosamente.');
        } catch (err) {
            console.error(err);
            setCreateError('Error al crear el artista');
            showErrorAlert('Error al crear el artista', 'Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        showArtistModal,
        setShowArtistModal,
        newArtistFormData,
        setNewArtistFormData,
        handleAddArtist,
        createError,
        isLoading, 
    };
};
