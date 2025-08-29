import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchFilteredAlbums, fetchAlbumFilters } from '../../services/albumService';
import { Album, AlbumFilterParams, AlbumsData } from '../../Interfaces/AlbumInterface';
import { FilterSection } from '../../Interfaces/CatalogueInterface';
import { groupAlbumsByArtist } from '../../utils/groupAlbumsByArtistUtils';

type SortOrder = 'asc' | 'desc' | 'artist' | '';

const buildFilterParams = (
  filters: Record<string, string[]>,
  page: number,
  size: number,
  sortOrder: SortOrder
): AlbumFilterParams => {
  const params: AlbumFilterParams = { page: page - 1, size };

  if (filters.artistName?.length) params.artistName = filters.artistName;
  if (filters.year?.length) {
    const expandedYears: number[] = [];
    filters.year.forEach((decadeStr) => {
      const match = decadeStr.match(/^(\d{4})s$/);
      if (match) {
        const startYear = parseInt(match[1]);
        for (let y = startYear; y < startYear + 10; y++) expandedYears.push(y);
      }
    });
    if (expandedYears.length) params.year = expandedYears;
  }
  if (filters.genre?.length) params.genre = filters.genre;

  // Solo enviar 'asc' o 'desc' al backend
  if (sortOrder === 'asc') params.sort = 'asc';
  else if (sortOrder === 'desc') params.sort = 'desc';
  // si es 'artist', no enviamos sort, backend ordena por artista por defecto

  return params;
};

export function useFilteredAlbums(
  initialSize = 9,
  externalPage?: number,
  externalSetPage?: (p: number) => void
) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [filters, setFilters] = useState<FilterSection[]>([
    { id: 'artistName', name: 'Artista', options: [] },
    { id: 'genre', name: 'Género', options: [] },
    { id: 'year', name: 'Año', options: [] },
  ]);

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [internalPage, internalSetPage] = useState(1);
  const [resetPageTrigger, setResetPageTrigger] = useState(false);

  const page = externalPage ?? internalPage;
  const setPage = externalSetPage ?? internalSetPage;
  const [pageSize, setPageSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const SORT_KEY = 'catalogueSortOrder';
  const [sortOrderState, setSortOrderState] = useState<SortOrder>(() => {
    const saved = sessionStorage.getItem(SORT_KEY);
    return saved === 'asc' || saved === 'desc' || saved === 'artist' ? saved : 'artist';
  });
  const setSortOrder = useCallback((order: SortOrder) => {
    sessionStorage.setItem(SORT_KEY, order);
    setSortOrderState(order);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFilters = useCallback(async () => {
    try {
      const data = await fetchAlbumFilters();
      setFilters([
        { id: 'artistName', name: 'Artista', options: (data.artists || []).map(a => ({ label: a, value: a })) },
        { id: 'genre', name: 'Género', options: (data.genres || []).map(g => ({ label: g, value: g })) },
        { id: 'year', name: 'Año', options: (data.decades || []).map(d => ({ label: d, value: d })) },
      ]);
    } catch (err) {
      console.error('Error loading filters:', err);
    }
  }, []);

  const loadAlbums = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const params = buildFilterParams(selectedFilters, page, pageSize, sortOrderState);

    try {
      const resp: AlbumsData = await fetchFilteredAlbums(params);
      setAlbums(resp.albums);
      setAllAlbums(resp.albums);
      setTotalPages(resp.totalPages);
      setTotalItems(resp.totalElements);
    } catch (err) {
      console.error('Error loading albums:', err);
      setAlbums([]);
      setTotalPages(1);
      setTotalItems(0);
      setError(err instanceof Error ? err.message : 'Error loading albums');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, selectedFilters, sortOrderState]);

  useEffect(() => {
    loadFilters();
    loadAlbums();
  }, [loadFilters, loadAlbums]);

  useEffect(() => {
    if (resetPageTrigger) {
      setPage(1);
      setResetPageTrigger(false);
    } else {
      loadAlbums();
    }
  }, [resetPageTrigger, loadAlbums, setPage]);

  const groupedAlbums = useMemo(() => {
    return sortOrderState === 'artist' ? groupAlbumsByArtist(albums) : { all: albums };
  }, [albums, sortOrderState]);

  return {
    albums,
    groupedAlbums,
    filters,
    selectedFilters,
    setSelectedFilters,
    isLoading,
    error,
    page,
    setPage,
    totalPages,
    totalItems,
    pageSize,
    setPageSize,
    sortOrder: sortOrderState,
    setSortOrder,
    reloadAlbums: loadAlbums,
    allAlbums,
    triggerPageReset: () => setResetPageTrigger(true),
  };
}
