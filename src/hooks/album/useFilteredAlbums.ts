import { useState, useEffect, useCallback } from 'react';
import { fetchFilteredAlbums } from '../../services/albumService';
import {
  Album,
  AlbumFilterParams,
  AlbumsData,
} from '../../Interfaces/AlbumInterface';
import { FilterSection } from '../../Interfaces/CatalogueInterface';
import { generateFiltersFromAlbums } from '../../utils/filterUtils';
import { groupAlbumsByArtist } from '../../utils/groupAlbumsByArtistUtils';

// Helper to build query parameters from filters, page, size, and sort order
const buildFilterParams = (
  filters: Record<string, string[]>,
  page: number,
  size: number,
  sortOrder: 'asc' | 'desc' | ''
): AlbumFilterParams => {
  const params: AlbumFilterParams = { page: page - 1, size };

  if (filters.artistName?.length) params.artistName = filters.artistName;

  // Expand decades into individual years
  if (filters.year?.length) {
    const expandedYears: number[] = [];
    filters.year.forEach((decadeStr) => {
      const match = decadeStr.match(/^(\d{4})s$/);
      if (match) {
        const startYear = parseInt(match[1]);
        for (let y = startYear; y < startYear + 10; y++) {
          expandedYears.push(y);
        }
      }
    });
    if (expandedYears.length) {
      params.year = expandedYears;
    }
  }

  if (filters.genre?.length) params.genre = filters.genre;

  if (sortOrder === 'asc' || sortOrder === 'desc') {
    params.sort = sortOrder;
  }

  return params;
};

export function useFilteredAlbums(
  initialSize = 9,
  externalPage?: number,
  externalSetPage?: (p: number) => void
) {
  // Paginated albums
  const [albums, setAlbums] = useState<Album[]>([]);
  // Albums grouped by artist (used when no sorting is applied)
  const [groupedAlbums, setGroupedAlbums] = useState<Record<string, Album[]>>({});
  // All albums (used to generate filter options)
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);

  // Filter metadata
  const [filters, setFilters] = useState<FilterSection[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Internal pagination state if no external pagination control is provided
  const [internalPage, internalSetPage] = useState(1);
  const [resetPageTrigger, setResetPageTrigger] = useState(false);

  const page = externalPage !== undefined ? externalPage : internalPage;
  const setPage = externalSetPage ?? internalSetPage;

  const [pageSize, setPageSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Sorting and loading states
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load both:
   * 1) All albums (to build filter options)
   * 2) Paginated albums (to display in the current page)
   * This is done in parallel to avoid UI delays (filter sidebar appears instantly)
   */
  const loadAlbums = useCallback(async () => {
    if (!pageSize) return;

    setIsLoading(true);
    setError(null);

    const pagedParams = buildFilterParams(selectedFilters, page, pageSize, sortOrder);

    try {
      const [allResp, pagedResp]: [AlbumsData, AlbumsData] = await Promise.all([
        fetchFilteredAlbums({ page: 0, size: 9999 }), // Full list for filters
        fetchFilteredAlbums(pagedParams),            // Paginated list for display
      ]);

      // Store all albums sorted alphabetically by artist
      const sortedAll = [...allResp.albums].sort((a, b) =>
        (a.artistName || '').localeCompare(b.artistName || '')
      );
      setAllAlbums(sortedAll);
      setFilters(generateFiltersFromAlbums(sortedAll));

      // Store current page albums
      const sortedPage = pagedResp.albums;
      setAlbums(sortedPage);

      // Group by artist only when no sorting is applied
      if (!sortOrder) {
        setGroupedAlbums(groupAlbumsByArtist(sortedPage));
      } else {
        setGroupedAlbums({ all: sortedPage });
      }

      setTotalPages(pagedResp.totalPages);
      setTotalItems(pagedResp.totalElements);

    } catch (err) {
      console.error('Error loading albums:', err);
      setAlbums([]);
      setGroupedAlbums({});
      setTotalPages(1);
      setTotalItems(0);
      setError('Error loading albums');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, selectedFilters, sortOrder]);

  // Reset page to 1 when the reset trigger is activated
  useEffect(() => {
    if (resetPageTrigger) {
      setPage(1);
      setResetPageTrigger(false);
    }
  }, [resetPageTrigger, setPage]);

  // Fetch albums on mount or whenever filters, page, size, or sort change
  useEffect(() => {
    if (!resetPageTrigger) {
      loadAlbums();
    }
  }, [loadAlbums, resetPageTrigger]);

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
    sortOrder,
    setSortOrder,
    reloadAlbums: loadAlbums,
    allAlbums,
    triggerPageReset: () => setResetPageTrigger(true),
  };
}
