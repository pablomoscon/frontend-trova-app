import { useEffect, useState } from 'react';
import { fetchAlbums } from '../../services/albumService';
import { generateFiltersFromAlbums, getNormalizedArtists } from '../../utils/catalogUtils';
import { Album } from '../../Interfaces/AlbumInterface';
import { FilterSection } from '../../Interfaces/CatalogueInterface';


export const useFilteredAlbums = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [allAlbums, setAllAlbums] = useState<Album[]>([]);
    const [filters, setFilters] = useState<FilterSection[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(true); // 👈

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const data = await fetchAlbums();
                setAllAlbums(data);
                setAlbums(data);
                setFilters(generateFiltersFromAlbums(data));
            } finally {
                setLoading(false); 
            }
        };

        loadAlbums();
    }, []);

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
        setSelectedFilters,
        loading
    };
};