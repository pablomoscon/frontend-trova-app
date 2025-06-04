
import { ArtistFormData } from '../Interfaces/ArtistInterface';
import { createArtist as createArtistService } from '../services/artistService';


export const createNewArtist = async (artistData: ArtistFormData) => {
    const formData = new FormData();
    formData.append('name', artistData.name);
    formData.append('details', artistData.details || 'Sin detalles');
    formData.append('nationality', artistData.nationality || 'Desconocida');
    formData.append(
        'photo',
        artistData.photo || new File([], 'placeholder.jpg')
    );

    const newArtist = await createArtistService(formData);
    return newArtist;
};

