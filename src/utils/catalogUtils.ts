import type { Album } from '../Interfaces/AlbumInterface';
import type { FilterSection } from '../Interfaces/CatalogueInterface';

export const normalizeArtistName = (name: string): string => {
    const lower = name.toLowerCase();
    const cleaned = lower
        .replace(/ y su .+$/, '')
        .replace(/ feat\..*$/, '')
        .replace(/\(.*\)/g, '')
        .replace(/[^a-záéíóúüñ ]/gi, '')
        .trim();

    return cleaned
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const getNormalizedArtists = (artistRaw: string): string[] => {
    return artistRaw.includes('/')
        ? artistRaw.split('/').map(name => normalizeArtistName(name.trim()))
        : [normalizeArtistName(artistRaw)];
};

const normalizeGenreName = (genre: string): string => {
    return genre
        .replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const generateFiltersFromAlbums = (albums: Album[]): FilterSection[] => {
    const artistSet = new Set<string>();
    const yearSet = new Set<number>();
    const genreSet = new Set<string>();

    albums.forEach((album) => {
        getNormalizedArtists(album.displayArtistName).forEach((normalized) => {
            if (normalized) artistSet.add(normalized);
        });

        yearSet.add(album.year);
        album.genres.forEach((genre) => genreSet.add(genre));
    });

    return [
        {
            id: 'artist',
            name: 'Artista',
            options: Array.from(artistSet).map((artist) => ({
                label: artist,
                value: artist,
            })),
        },
        {
            id: 'genre',
            name: 'Género',
            options: Array.from(genreSet).map((genre) => ({
                label: normalizeGenreName(genre),
                value: genre,
            })),
        },
        {
            id: 'year',
            name: 'Año',
            options: Array.from(yearSet)
                .sort((a, b) => b - a)
                .map((year) => ({
                    label: year.toString(),
                    value: year.toString(),
                })),
        },
    ];
};
