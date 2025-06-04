import { useEffect, useState } from 'react';
import { Album } from '../../Interfaces/AlbumInterface';
import { FilterSection } from '../../Interfaces/CatalogueInterface';
import { generateFiltersFromAlbums, getNormalizedArtists } from '../../utils/catalogUtils';

export const useFilteredAlbums = (allAlbums: Album[], loading: boolean) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [filters, setFilters] = useState<FilterSection[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (!loading && allAlbums.length > 0) {
            setAlbums(allAlbums);
            setFilters(generateFiltersFromAlbums(allAlbums));
        }
    }, [allAlbums, loading]);

    useEffect(() => {
        const filtered = allAlbums.filter((album) =>
            Object.entries(selectedFilters).every(([key, values]) => {
                if (values.length === 0) return true;
                if (key === 'genre') return album.genres.some((genre) => values.includes(genre));
                if (key === 'artist') {
                    const albumArtists = getNormalizedArtists(album.displayArtistName);
                    return values.some((v) => albumArtists.includes(v));
                }
                if (key === 'year') return values.includes(album.year.toString());
                return true;
            })
        );

        setAlbums(filtered);
    }, [selectedFilters, allAlbums]);

    return {
        albums,
        filters,
        selectedFilters,
        setSelectedFilters
    };
};
