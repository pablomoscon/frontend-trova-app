import { Album } from '../Interfaces/AlbumInterface';
import { FilterSection } from '../Interfaces/CatalogueInterface';

const getNormalizedArtists = (artistString: string): string[] =>
    artistString.split(',').map((a) => a.trim());

export const generateFiltersFromAlbums = (albums: Album[]): FilterSection[] => {
    const genres = new Set<string>();
    const decades = new Set<string>();
    const artists = new Set<string>();

    for (const album of albums) {
        album.genres.forEach((g) => genres.add(g));

        const decade = Math.floor(album.year / 10) * 10;
        decades.add(`${decade}s`);

        getNormalizedArtists(album.artistName).forEach((a) => artists.add(a));
    }

    return [
        {
            id: 'artistName',
            name: 'Artista',
            options: Array.from(artists)
                .sort((a, b) => a.localeCompare(b)) 
                .map((a) => ({ label: a, value: a })),
        },
        {
            id: 'genre',
            name: 'Género',
            options: Array.from(genres)
                .sort((a, b) => a.localeCompare(b)) 
                .map((g) => ({ label: g, value: g })),
        },
        {
            id: 'year',
            name: 'Año',
            options: Array.from(decades)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((d) => ({ label: d, value: d })),
        },
    ];
};
