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

const buildFilterParams = (
  filters: Record<string, string[]>,
  page: number,
  size: number,
  sortOrder: 'asc' | 'desc' | ''
): AlbumFilterParams => {
  const params: AlbumFilterParams = { page: page - 1, size };

  if (filters.artistName?.length) params.artistName = filters.artistName;
  if (filters.year?.length) params.year = filters.year.map(Number);
  if (filters.genre?.length) params.genre = filters.genre;

  // Solo setear 'sort' si sortOrder es 'asc' o 'desc'
  if (sortOrder === 'asc' || sortOrder === 'desc') {
    params.sort = sortOrder;
  }

  return params;
};

export function useFilteredAlbums(initialSize = 9) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [groupedAlbums, setGroupedAlbums] = useState<Record<string, Album[]>>({});
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);

  const [filters, setFilters] = useState<FilterSection[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllAlbums = async () => {
      try {
        const { albums: all } = await fetchFilteredAlbums({
          page: 0,
          size: 9999,
        });

        const sorted = [...all].sort((a, b) =>
          (a.artistName || '').localeCompare(b.artistName || '')
        );

        setAllAlbums(sorted);
        setFilters(generateFiltersFromAlbums(sorted));
      } catch (err) {
        console.error('Error loading full album list:', err);
      }
    };

    fetchAllAlbums();
  }, []);

  const loadAlbums = useCallback(async () => {
    if (!pageSize) return;

    setIsLoading(true);
    setError(null);

    const params = buildFilterParams(selectedFilters, page, pageSize, sortOrder);

    try {
      const data: AlbumsData = await fetchFilteredAlbums(params);

      const sorted = data.albums;

      setAlbums(sorted);

      if (!sortOrder) {
        setGroupedAlbums(groupAlbumsByArtist(sorted));
      } else {
        setGroupedAlbums({ all: sorted });
      }

      setTotalPages(data.totalPages);
      setTotalItems(data.totalElements);
      setPage(data.currentPage ? data.currentPage + 1 : 1);
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

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  useEffect(() => {
    setPage(1);
  }, [selectedFilters]);

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
  };
}
