import axios, { AxiosError } from 'axios';
import { Album, AlbumFilterParams, AlbumFilterResponse, AlbumFormData, AlbumsByArtistResponse, AlbumsData, Status } from '../Interfaces/AlbumInterface';
import axiosInstance from '../api/axiosInstance';
import { Song } from '../Interfaces/SongInterface';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const fetchAlbums = async (
  page: number,
  size: number
): Promise<AlbumsData> => {
  const { data } = await axios.get<AlbumsData>((`${baseURL}/albums`), {
    params: { page: page, size },
  });
  return data;                     
};

export const fetchAlbumById = async (id: number): Promise<Album> => {
  const { data } = await axios.get<Album>(
    `${baseURL}/albums/${id}`,
    { withCredentials: true }
  );
  return data;
};

export const fetchAlbumsByArtist = async (
  artistId: number,
  page: number,
  size: number,
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<AlbumsByArtistResponse> => {
  const response = await fetch(
    `${baseURL}/albums/by-artist/${artistId}?page=${page}&size=${size}&sort=${sortOrder}`
  );
  if (!response.ok) throw new Error('Error fetching albums by artist');
  return response.json();
};

export async function fetchFilteredAlbums(params: AlbumFilterParams): Promise<AlbumFilterResponse> {
  const { data } = await axios.get(`${baseURL}/albums/filter`, {
    params,
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, String(v)));
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      return searchParams.toString();
    },
  });

  return data;
};

export const searchAlbums = async (
  query: string,
  page: number,
  size: number,
  status?: Status
): Promise<AlbumsData> => {
  if (!query.trim()) {
    return { albums: [], totalPages: 0, totalElements: 0, currentPage: 0 };
  }

  const { data } = await axiosInstance.get<AlbumsData>('/albums/search', {
    params: {
      q: query.trim(),
      page,
      size,
      ...(status && { status }),
    },
  });

  return data;
};

export const createAlbum = async (newAlbum: FormData): Promise<Album> => {
  try {
    const response = await axiosInstance.post <Album>(
      `/albums`,
      newAlbum,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating album', error);
    throw error;
  }
};

export const editAlbum = async (
  id: number,
  updated: Partial<AlbumFormData>
): Promise<Album> => {
  try {
    const form = new FormData();

    Object.entries(updated).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === 'genres') {
        (value as string[]).forEach((g) => form.append('genres', g));
      } else if (key === 'listOfSongs') {
        (value as Song[]).forEach((s, idx) =>
          form.append(`listOfSongs[${idx}].name`, s.name)
        );
      } else if (key === 'photo') {
        form.append('photo', value as File);
      } else {
        form.append(key, value as any);
      }
    });

    const { data } = await axiosInstance.patch<Album>(
      `/albums/${id}`, 
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return data;
  } catch (err) {
    const error = err as AxiosError;
    console.error('Error editing album:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

export const addSongsToAlbum = async (
  albumId: number,
  songs: Song[]
): Promise<Song[]> => {
  try {
    const response = await axiosInstance.post(
      `/albums/${albumId}/add-songs`,
      songs,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating songs:', error);
    throw new Error(error.response?.data?.message || 'Error creating songs');
  }
};


export const deleteAlbum = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/albums/${id}`);
};

