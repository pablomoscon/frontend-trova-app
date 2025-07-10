import axios, { AxiosError } from 'axios';
import { Album, AlbumFilterParams, AlbumFilterResponse, AlbumFormData, AlbumsData } from '../Interfaces/AlbumInterface';
import axiosInstance from '../api/axiosInstance';
import { Song } from '../Interfaces/SongInterface';


export const fetchAlbums = async (
  page: number,
  size: number
): Promise<AlbumsData> => {
  const { data } = await axios.get<AlbumsData>('http://localhost:8081/albums', {
    params: { page: page, size },
  });
  return data;                     
};

export const fetchAlbumById = async (id: number): Promise<Album> => {
  const { data } = await axios.get<Album>(
    `http://localhost:8081/albums/${id}`,
    { withCredentials: true }
  );
  return data;
};

export const fetchAlbumsByArtist = async (
  artistId: number,
  page: number = 1,
  size: number = 15
): Promise<AlbumsData> => {
  try {
    const { data } = await axios.get<AlbumsData>(
      `http://localhost:8081/albums/by-artist/${artistId}?page=${
        page - 1
      }&size=${size}`
    );
    return data;
  } catch (error) {
    console.error('Error fetching albums by artist', error);
    throw error;
  }
};

export async function fetchFilteredAlbums(params: AlbumFilterParams): Promise<AlbumFilterResponse> {
  const { data } = await axios.get('http://localhost:8081/albums/filter', {
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
  size: number
): Promise<AlbumsData> => {
  if (query.trim() === '') {
    return {
      albums: [],
      totalPages: 0,
      totalElements: 0,
      currentPage: 0,
    };
  }

  const { data } = await axiosInstance.get<AlbumsData>('http://localhost:8081/albums/search', {
    params: { q: query, page: page - 1, size },
  });
  return data;
};

export const createAlbum = async (newAlbum: FormData): Promise<Album> => {
  try {
    const response = await axiosInstance.post <Album>(
      'http://localhost:8081/albums',
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
          form.append(`listOfSongs[${idx}].name`, s.title)
        );
      } else if (key === 'photo') {
        form.append('photo', value as File);
      } else {
        form.append(key, value as any);
      }
    });

    const { data } = await axiosInstance.patch<Album>(
      `http://localhost:8081/albums/${id}`, 
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
export const deleteAlbum = async (id: number): Promise<void> => {
  await axiosInstance.delete(`http://localhost:8081/albums/${id}`);
};

