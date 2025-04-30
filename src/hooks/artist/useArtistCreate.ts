import { useState } from 'react';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';

export const useArtistCreate = (
    addNewArtist: Function,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
    const [showArtistModal, setShowArtistModal] = useState(false);
    const [newArtistFormData, setNewArtistFormData] = useState({
        name: '',
        details: '',
        nationality: '',
        photo: '',
    });
    const [createError, setCreateError] = useState<null | string>(null);

    const handleAddArtist = async () => {
        if (!newArtistFormData.name.trim()) return;

        try {
            setCreateError(null);
            const newArtist = await addNewArtist(newArtistFormData);
            handleChange({
                target: { name: 'artist', value: newArtist.id || '' },
            } as React.ChangeEvent<HTMLInputElement>);
            setShowArtistModal(false);
            setNewArtistFormData({
                name: '',
                details: '',
                nationality: '',
                photo: '',
            });
            showSuccessAlert('Artista creado con éxito');
        } catch (error) {
            setCreateError('Error al crear el artista')
                showErrorAlert('Error al crear el artista');
        }
    };

    return {
        showArtistModal,
        setShowArtistModal,
        newArtistFormData,
        setNewArtistFormData,
        handleAddArtist,
        createError,
    };
};


