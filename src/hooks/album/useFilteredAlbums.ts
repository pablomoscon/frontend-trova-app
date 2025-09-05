import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchFilteredAlbums, fetchAlbumFilters } from '../../services/albumService';
import { Album, AlbumFilterParams, AlbumsData } from '../../Interfaces/AlbumInterface';
import { FilterSection } from '../../Interfaces/CatalogueInterface';

type SortOrder = 'asc' | 'desc' | 'artist' | '';

/**
 * Build params to send to backend based on filters, pagination, and sort order.
 */
const buildFilterParams = (
  filters: Record<string, string[]>,
  page: number,
  size: number,
  sortOrder: SortOrder
): AlbumFilterParams => {
  const params: AlbumFilterParams = { page: page - 1, size };

  if (filters.artistName?.length) params.artistName = filters.artistName;

  // Expand "1990s" → [1990, 1991, ..., 1999]
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

  if (sortOrder === 'asc') params.sort = 'asc';
  else if (sortOrder === 'desc') params.sort = 'desc';
  // If "artist", backend handles it as default

  return params;
};

/**
 * Hook to fetch, filter and paginate albums from backend.
 * Handles race conditions with requestId to avoid flickering.
 */
export function useFilteredAlbums(
  initialSize = 9,
  externalPage?: number,
  externalSetPage?: (p: number) => void
) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filters, setFilters] = useState<FilterSection[]>([
    { id: 'artistName', name: 'Artist', options: [] },
    { id: 'genre', name: 'Genre', options: [] },
    { id: 'year', name: 'Year', options: [] },
  ]);

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [internalPage, internalSetPage] = useState(1);

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
  const [resetPageTrigger, setResetPageTrigger] = useState(false);

  // Keep track of the latest request to prevent outdated updates
  const latestRequestId = useRef<number>(0);

  /**
   * Load available filters
   */
  const loadFilters = useCallback(async () => {
    try {
      const data = await fetchAlbumFilters();
      setFilters([
        { id: 'artistName', name: 'Artist', options: (data.artists || []).map(a => ({ label: a, value: a })) },
        { id: 'genre', name: 'Genre', options: (data.genres || []).map(g => ({ label: g, value: g })) },
        { id: 'year', name: 'Year', options: (data.decades || []).map(d => ({ label: d, value: d })) },
      ]);
    } catch (err) {
      console.error('Error loading filters:', err);
    }
  }, []);

  /**
   * Load albums with filters, pagination and sort.
   */
  const loadAlbums = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const currentRequestId = Date.now();
    latestRequestId.current = currentRequestId;

    const params = buildFilterParams(selectedFilters, page, pageSize, sortOrderState);

    try {
      const resp: AlbumsData = await fetchFilteredAlbums(params);

      if (latestRequestId.current !== currentRequestId) return; 

      setAlbums(resp.albums);
      setTotalPages(resp.totalPages);
      setTotalItems(resp.totalElements);
    } catch (err) {
      if (latestRequestId.current !== currentRequestId) return;

      console.error('Error loading albums:', err);
      setAlbums([]);
      setTotalPages(1);
      setTotalItems(0);
      setError(err instanceof Error ? err.message : 'Error loading albums');
    } finally {
      if (latestRequestId.current === currentRequestId) {
        setIsLoading(false);
      }
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

  return {
    albums,
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
    triggerPageReset: () => setResetPageTrigger(true),
  };
}
