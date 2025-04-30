
import { ArtistFormData } from '../Interfaces/ArtistInterface';
import { createArtist as createArtistService } from '../services/artistService';

export const createNewArtist = async (artistData: ArtistFormData
) => {
    const newArtist = await createArtistService({
        ...artistData,
        details: artistData.details || 'Sin detalles',
        nationality: artistData.nationality || 'Desconocida',
        photo: artistData.photo || 'https://via.placeholder.com/150',
    });
    return newArtist;
};
