import { Album } from '../Interfaces/AlbumInterface';
import { FilterSection } from '../Interfaces/CatalogueInterface';

const getNormalizedArtists = (artistString: string): string[] =>
    artistString.split(',').map((a) => a.trim());

export const generateFiltersFromAlbums = (albums: Album[]): FilterSection[] => {
    const genres = new Set<string>();
    const years = new Set<number>();
    const artists = new Set<string>();

    for (const album of albums) {
        album.genres.forEach((g) => genres.add(g));
        years.add(album.year);
        getNormalizedArtists(album.artistName).forEach((a) => artists.add(a));
    }

    return [
        {
            id: 'artistName',
            name: 'Artista',
            options: Array.from(artists).sort().map((a) => ({ label: a, value: a })),
        },
        {
            id: 'genre',
            name: 'Género',
            options: Array.from(genres).sort().map((g) => ({ label: g, value: g })),
        },
        {
            id: 'year',
            name: 'Año',
            options: Array.from(years).sort((a, b) => b - a).map((y) => ({
                label: y.toString(),
                value: y.toString(),
            })),
        },
    ];
};
